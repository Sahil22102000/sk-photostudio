import List "mo:core/List";
import TestimonialsTypes "types/testimonials";
import ContactTypes "types/contact";
import TestimonialsMixin "mixins/testimonials-api";
import ContactMixin "mixins/contact-api";



actor {
  let testimonials = List.empty<TestimonialsTypes.Testimonial>();
  let nextTestimonialId = { var val : Nat = 0 };

  let contactSubmissions = List.empty<ContactTypes.ContactSubmission>();
  let nextSubmissionId = { var val : Nat = 0 };

  let appointments = List.empty<ContactTypes.Appointment>();
  let nextAppointmentId = { var val : Nat = 0 };

  include TestimonialsMixin(testimonials, nextTestimonialId);
  include ContactMixin(contactSubmissions, nextSubmissionId, appointments, nextAppointmentId);
};
