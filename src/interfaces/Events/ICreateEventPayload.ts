export default interface ICreateEventPayload {
  userId: string,
  description: string;
  dayOfWeek: 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
}