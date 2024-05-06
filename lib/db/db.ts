import { drizzle } from 'drizzle-orm/postgres-js';
import { pgTable, serial, varchar, boolean, text, integer, date, timestamp } from 'drizzle-orm/pg-core';
import postgres from 'postgres';
import { genSaltSync, hashSync } from 'bcrypt-ts';
import { eq } from 'drizzle-orm';
import { User } from 'next-auth';
import { Contact, SwapperUser, SwapperUserBase, Transition } from '@/lib/models/SwapperUser.types';

const client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`);
const db = drizzle(client);

const swapperUserBase = pgTable('swapper_user_base', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
  email: varchar('email', { length: 255 }).unique(),
  password: varchar('password', { length: 255 }),
  name: varchar('name', { length: 255 }),
  picture: text('picture'),
  setupComplete: boolean('setup_complete'),
  lastLogin: timestamp('last_login'),
});

const swapperUser = pgTable('swapper_user', {
  userId: integer('user_id').references(() => swapperUserBase.id).primaryKey(),
  firstName: varchar('first_name', { length: 64 }).notNull(),
  schoolName: varchar('school_name', { length: 64 }).notNull(),
  lastName: varchar('last_name', { length: 64 }).notNull(),
  nickname: varchar('nickname', { length: 64 }),
  originId: integer('origin_id').references(() => transition.id),
  destinationId: integer('destination_id').references(() => transition.id),
  contactId: integer('contact_id').references(() => contact.id),
});

const transition = pgTable('transition', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
  areaOffice: varchar('area_office', { length: 255 }).notNull(),
  province: varchar('province', { length: 255 }).notNull(),
  subprovince: varchar('subprovince', { length: 255 }).notNull(),
  educationArea: varchar('education_area', { length: 255 }).notNull(),
  major: varchar('major', { length: 64 }).notNull(),
});

const contact = pgTable('contact', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
  email: varchar('email', { length: 255 }).notNull(),
  line: varchar('line', { length: 255 }),
  facebook: varchar('facebook', { length: 255 }),
  phone: varchar('phone', { length: 20 }),
});

export async function getUserBase(email: string): Promise<SwapperUserBase | undefined> {
  const result = await db
    .select()
    .from(swapperUserBase)
    .where(eq(swapperUserBase.email, email)).then((res) => res[0]);

  if (!result) return undefined;

  return {
    id: result.id,
    createdAt: result.createdAt!,
    updatedAt: result.updatedAt!,
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
    createdAt: user.swapper_user_base.createdAt!,
    updatedAt: user.swapper_user_base.updatedAt!,
    email: user.swapper_user_base.email!,
    password: user.swapper_user_base.password!,
    name: user.swapper_user_base.name!,
    picture: user.swapper_user_base.picture!,
    setupComplete: user.swapper_user_base.setupComplete!,
    lastLogin: user.swapper_user_base.lastLogin!,
    firstName: user.swapper_user.firstName!,
    lastName: user.swapper_user.lastName!,
    nickname: user.swapper_user.nickname!,
    schoolName: user.swapper_user.schoolName!,
    origin: {
      id: origin.id,
      createdAt: origin.createdAt!,
      updatedAt: origin.updatedAt!,
      areaOffice: origin.areaOffice,
      province: origin.province,
      subprovince: origin.subprovince,
      major: origin.major,
      educationArea: origin.educationArea,
    },
    destination: {
      id: destination.id,
      createdAt: destination.createdAt!,
      updatedAt: destination.updatedAt!,
      areaOffice: destination.areaOffice,
      province: destination.province,
      subprovince: destination.subprovince,
      major: destination.major,
      educationArea: destination.educationArea,
    },
    contact: _contact as any,
  }
}

export async function createUser(authUser: User, password: string): Promise<number> {
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

  return db.insert(swapperUser).values({
      userId: result[0].id!,
      firstName,
      lastName,
      nickname: '',
      schoolName: '',
    }).returning({ userId: swapperUser.userId })
      .then((res) => res[0].userId);
}

export async function upsertTransition(newTransition: Transition, id?: number): Promise<number> {
  const result = await db.select().from(transition).where(eq(transition.id, id!)).then((res) => res[0]);

  if (result) {
    return updateTransition(newTransition);
  }

  return createTransition(newTransition);
}

export async function getTransition(id: number): Promise<Transition | undefined> {
  const result = await db.select().from(transition).where(eq(transition.id, id)).then((res) => res[0]);

  return {
    ...result,
    createdAt: result.createdAt!,
    updatedAt: result.updatedAt!,
  }
}

export async function createTransition(newTransition: Transition): Promise<number> {
  return db.insert(transition).values(newTransition)
    .returning({ id: transition.id })
    .then((res) => res[0].id);
}

export async function updateTransition(updatedTransition: Transition): Promise<number> {
  return db.update(transition).set({
    id: updatedTransition.id,
    areaOffice: updatedTransition.areaOffice,
    province: updatedTransition.province,
    subprovince: updatedTransition.subprovince,
    major: updatedTransition.major,
    educationArea: updatedTransition.educationArea,
  }).where(eq(transition.id, updatedTransition.id!))
    .returning({ id: transition.id })
    .then((res) => res[0].id);
}

export async function deleteTransition(id: number) {
  await db.delete(transition).where(eq(transition.id, id));
}

export async function upsertContact(newContact: Contact, id?: number): Promise<number> {
  const result = await db.select().from(contact).where(eq(contact.id, id!)).then((res) => res[0]);

  if (result) {
    return updateContact(newContact);
  }

  return createContact(newContact);
}

export async function getContact(id: number): Promise<Contact | undefined> {
  const _contact = await db.select().from(contact).where(eq(contact.id, id)).then((res) => res[0]);

  return {
    id: _contact.id,
    email: _contact.email,
    line: _contact.line ?? undefined,
    facebook: _contact.facebook ?? undefined,
    phone: _contact.phone ?? undefined,
  };
}

export async function createContact(newContact: Contact): Promise<number> {
  return db.insert(contact).values(newContact)
    .returning({ id: contact.id })
    .then((res) => res[0].id);
}

export async function updateContact(updatedContact: Contact): Promise<number> {
  return db.update(contact).set({
    phone: updatedContact.phone,
    facebook: updatedContact.facebook,
    line: updatedContact.line,
    email: updatedContact.email,
  }).where(eq(contact.id, updatedContact.id!))
    .returning({ id: contact.id })
    .then((res) => res[0].id);
}

export async function deleteContact(id: number) {
  await db.delete(contact).where(eq(contact.id, id));
}

export async function updateUserBase(user: SwapperUserBase): Promise<number> {
  return db.update(swapperUserBase).set({
    name: user.name,
    picture: user.picture,
    setupComplete: user.setupComplete,
  }).where(eq(swapperUserBase.id, user.id!))
    .returning({ id: swapperUserBase.id })
    .then((res) => res[0].id);
}

export async function updateUser(user: SwapperUser) {
  await db.update(swapperUserBase).set({
    name: user.name,
    picture: user.picture,
    setupComplete: user.setupComplete,
    lastLogin: user.lastLogin,
  }).where(eq(swapperUserBase.id, user.id!));

  await db.update(swapperUser).set({
    firstName: user.firstName,
    lastName: user.lastName,
    nickname: user.nickname,
    schoolName: user.schoolName,
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

export async function updateUserBaseLastLogin(user: SwapperUserBase) {
  return db.update(swapperUserBase).set({
    lastLogin: new Date(Date.now()),
  }).where(eq(swapperUserBase.id, user.id!));
}
