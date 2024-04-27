import { drizzle } from 'drizzle-orm/postgres-js';
import { pgTable, serial, varchar, boolean, text, integer } from 'drizzle-orm/pg-core';
import postgres from 'postgres';
import { genSaltSync, hashSync } from 'bcrypt-ts';
import { eq } from 'drizzle-orm';
import { User } from 'next-auth';
import { Contact, SwapperUser, SwapperUserBase, Transition } from '@/lib/models/SwapperUser.types';

const client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`);
const db = drizzle(client);

const swapperUserBase = pgTable('swapper_user_base', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).unique(),
  name: varchar('name', { length: 255 }),
  picture: text('picture'),
  setupComplete: boolean('setup_complete'),
  password: varchar('password', { length: 255 })
});

const swapperUser = pgTable('swapper_user', {
  userId: integer('user_id').references(() => swapperUserBase.id).primaryKey(),
  firstName: varchar('first_name', { length: 64 }).notNull(),
  lastName: varchar('last_name', { length: 64 }).notNull(),
  nickname: varchar('nickname', { length: 64 }),
  originId: integer('origin_id').references(() => transition.id),
  destinationId: integer('destination_id').references(() => transition.id),
  contactId: integer('contact_id').references(() => contact.id),
});

const transition = pgTable('transition', {
  id: serial('id').primaryKey(),
  areaOffice: varchar('area_office', { length: 255 }).notNull(),
  province: varchar('province', { length: 255 }).notNull(),
  subprovince: varchar('subprovince', { length: 255 }).notNull(),
  major: varchar('major', { length: 64 }).notNull(),
});

const contact = pgTable('contact', {
  id: serial('id').primaryKey(),
  phone: varchar('phone', { length: 20 }),
  facebook: varchar('facebook', { length: 255 }),
  line: varchar('line', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull(),
});

export async function getUserBase(email: string): Promise<SwapperUserBase | undefined> {
  const result = await db
    .select()
    .from(swapperUserBase)
    .where(eq(swapperUserBase.email, email)).then((res) => res[0]);

  if (!result) return undefined;

  return {
    id: result.id,
    email: result.email!,
    name: result.name!,
    picture: result.picture!,
    setupComplete: result.setupComplete!,
    password: result.password!,
  };
}

export async function getUser(email: string): Promise<SwapperUser> {
  const user = await db
    .select()
    .from(swapperUserBase)
    .innerJoin(swapperUser, eq(swapperUserBase.id, swapperUser.userId))
    .where(eq(swapperUserBase.email, email)).then((res) => res[0]);

  const origin = await db
    .select()
    .from(transition)
    .where(eq(transition.id, user.swapper_user.originId!)).then((res) => res[0]);

  const destination = await db
    .select()
    .from(transition)
    .where(eq(transition.id, user.swapper_user.destinationId!)).then((res) => res[0]);

  const _contact = await db
    .select()
    .from(contact)
    .where(eq(contact.id, user.swapper_user.contactId!)).then((res) => res[0]);

  return {
    id: user.swapper_user_base.id,
    email: user.swapper_user_base.email!,
    name: user.swapper_user_base.name!,
    picture: user.swapper_user_base.picture!,
    setupComplete: user.swapper_user_base.setupComplete!,
    firstName: user.swapper_user.firstName!,
    lastName: user.swapper_user.lastName!,
    nickname: user.swapper_user.nickname!,
    origin,
    destination,
    contact: _contact as any,
    password: user.swapper_user_base.password!,
  }
}

export async function createUser(authUser: User, password: string) {
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);

  const userBase: SwapperUserBase = {
    email: authUser.email!,
    name: authUser.name!,
    picture: authUser.image!,
    password: hash,
    setupComplete: false,
  };

  const result = await db.insert(swapperUserBase).values(userBase).returning({ id: swapperUserBase.id });

  const name = authUser.name!.split(' ');
  const firstName = name[0];
  const lastName = name[1] ?? '';

  await db.insert(swapperUser).values({
      userId: result[0].id!,
      firstName,
      lastName,
      nickname: '',
    });
}

export async function createTransition(newTransition: Transition) {
  const result = await db.insert(transition).values(newTransition).returning({ id: transition.id });
  return result[0].id;
}

export async function createContact(newContact: Contact) {
  const result = await db.insert(contact).values(newContact).returning({ id: contact.id });
  return result[0].id;
}

export async function updateUserBase(user: SwapperUserBase) {
  await db.update(swapperUserBase).set({
    name: user.name,
    picture: user.picture,
    setupComplete: user.setupComplete,
  }).where(eq(swapperUserBase.id, user.id!));
}

export async function updateUser(user: SwapperUser) {
  await db.update(swapperUserBase).set({
    name: user.name,
    picture: user.picture,
    setupComplete: user.setupComplete,
  }).where(eq(swapperUserBase.id, user.id!));

  await db.update(swapperUser).set({
    firstName: user.firstName,
    lastName: user.lastName,
    nickname: user.nickname,
    originId: user.origin.id,
    destinationId: user.destination.id,
    contactId: user.contact.id,
  }).where(eq(swapperUser.userId, user.id!));

  await db.update(contact).set({
    phone: user.contact.phone,
    facebook: user.contact.facebook,
    line: user.contact.line,
    email: user.contact.email,
  }).where(eq(contact.id, user.contact.id!));

  await db.update(transition).set({
    areaOffice: user.origin.areaOffice,
    province: user.origin.province,
    subprovince: user.origin.subprovince,
    major: user.origin.major,
  }).where(eq(transition.id, user.origin.id!));

  await db.update(transition).set({
    areaOffice: user.destination.areaOffice,
    province: user.destination.province,
    subprovince: user.destination.subprovince,
    major: user.destination.major,
  }).where(eq(transition.id, user.destination.id!));
}
