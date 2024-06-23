export interface Exam {
    id: string;
    courseId: string;
    name: string;
    description: string;
    questions: Question[];
    isSubmitted: boolean;
    result: number | null;
}

export interface Question {
    question: string;
    options: string[];
    correctOption: string;
    incorrect_answers:[];
    id:string;
}