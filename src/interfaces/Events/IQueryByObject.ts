export default interface IQueryByObject {
  description?: string;
  dayOfWeek?: 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
  limit?: number;
  sort?: 'asc' | 'desc';
  page?: number;
  skip?: number;
}