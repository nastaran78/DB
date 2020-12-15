export default class CreateTaskDto {
  readonly text: string;
  readonly categoryId: number;
  readonly labels: number[];
  readonly items: number[];
}