export interface SequenceInterface {
  delay: number;
  random: number;
  sequence: string[];
}
export interface SerieInterface {
  name: string;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  sequence?: SequenceInterface[];
}
