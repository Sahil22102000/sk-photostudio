import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface Appointment {
    id: bigint;
    serviceType: string;
    name: string;
    createdAt: Timestamp;
    email: string;
    message: string;
    preferredDate: string;
    phone: string;
}
export interface ContactSubmission {
    id: bigint;
    name: string;
    createdAt: Timestamp;
    email: string;
    message: string;
    programInterest: string;
    phone: string;
}
export interface Testimonial {
    id: bigint;
    name: string;
    createdAt: Timestamp;
    role: string;
    quote: string;
    rating: bigint;
}
export interface backendInterface {
    addTestimonial(name: string, role: string, quote: string, rating: bigint): Promise<bigint>;
    getAppointments(): Promise<Array<Appointment>>;
    getContactSubmissions(): Promise<Array<ContactSubmission>>;
    getTestimonials(): Promise<Array<Testimonial>>;
    submitAppointment(name: string, email: string, phone: string, serviceType: string, preferredDate: string, message: string): Promise<boolean>;
    submitContactForm(name: string, email: string, phone: string, programInterest: string, message: string): Promise<boolean>;
}
