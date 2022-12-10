export interface Estudiante {
  s_id: number,
  first_name: string,
  last_name?: string,
  lv_id? : number,
  group?: string,
  email?: string,
  phone_number?: string,
  geolocation?: string,
  status: boolean,
}
