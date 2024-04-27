import json

def read_json_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)
    return data

def generate_district_data(provinces, districts):
    district_data = {}

    for province in provinces:
        province_name = province['provinceNameEn']
        district_data[province_name] = []

        for district in districts:
            if district['provinceCode'] == province['provinceCode']:
                district_data[province_name].append(district['districtNameEn'])

    return district_data

def main():
    provinces = read_json_file('provinces.json')
    districts = read_json_file('districts.json')

    district_data = generate_district_data(provinces, districts)

    print(json.dumps(district_data, indent=4, ensure_ascii=False))

if __name__ == "__main__":
    main()
