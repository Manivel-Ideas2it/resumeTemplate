export interface MarkItem {
  subject: string;
  mark: string;
}

export interface StudentFormData {
  name: string;
  rollNo: string;
  className: string;
  marks: MarkItem[];
}
