export default interface PaginationState {
  currentOffset: number;
  prevOffset: number | null;
  nextOffset: number | null;
  currentLimit: number;
}
