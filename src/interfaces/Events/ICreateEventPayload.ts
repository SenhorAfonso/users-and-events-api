export default interface ICreateEventPayload {
  description: string;
  dayOfWeek: 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
}