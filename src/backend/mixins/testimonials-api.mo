import List "mo:core/List";
import TestimonialsLib "../lib/testimonials";
import Types "../types/testimonials";

mixin (
  testimonials : List.List<Types.Testimonial>,
  nextTestimonialId : { var val : Nat },
) {
  TestimonialsLib.seedIfEmpty(testimonials, nextTestimonialId);

  public query func getTestimonials() : async [Types.Testimonial] {
    TestimonialsLib.getAll(testimonials);
  };

  public func addTestimonial(
    name : Text,
    role : Text,
    quote : Text,
    rating : Nat,
  ) : async Nat {
    TestimonialsLib.add(testimonials, nextTestimonialId, name, role, quote, rating);
  };
};
