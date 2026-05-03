import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/testimonials";

module {
  public func getAll(testimonials : List.List<Types.Testimonial>) : [Types.Testimonial] {
    testimonials.toArray();
  };

  public func add(
    testimonials : List.List<Types.Testimonial>,
    nextId : { var val : Nat },
    name : Text,
    role : Text,
    quote : Text,
    rating : Nat,
  ) : Nat {
    let id = nextId.val;
    nextId.val += 1;
    testimonials.add({
      id;
      name;
      role;
      quote;
      rating;
      createdAt = Time.now();
    });
    id;
  };

  public func seedIfEmpty(
    testimonials : List.List<Types.Testimonial>,
    nextId : { var val : Nat },
  ) {
    if (not testimonials.isEmpty()) return;

    let seeds : [(Text, Text, Text, Nat)] = [
      ("Ravi Kulkarni", "Happy Customer", "SK PHOTOSTUDIO did an amazing job with my wedding photo album. The prints are crystal clear and the binding is premium quality. Highly recommended!", 5),
      ("Priya Deshmukh", "Happy Customer", "Got my passport photos done here — quick, professional, and perfectly sized. The staff was very helpful and friendly. Best studio in Khapri!", 5),
      ("Amit Thakare", "Happy Customer", "I had my family portraits framed at SK PHOTOSTUDIO and the result was stunning. They chose the perfect frame to complement the photos. Absolutely loved it!", 5),
      ("Sunita Bonde", "Happy Customer", "Excellent photo printing service. The colors are vibrant and true to life. I ordered a large canvas print and it looks gorgeous on my wall.", 5),
      ("Deepak Meshram", "Happy Customer", "Very professional service for visa photos. They know exactly the specifications required and delivered in minutes. Will definitely come back for all my photo needs.", 5),
      ("Kavita Nagpure", "Happy Customer", "SK PHOTOSTUDIO turned my old photos into a beautiful framed collage. The quality of work is exceptional and the price is very reasonable. Thank you!", 5),
    ];

    for ((name, role, quote, rating) in seeds.values()) {
      let id = nextId.val;
      nextId.val += 1;
      testimonials.add({
        id;
        name;
        role;
        quote;
        rating;
        createdAt = Time.now();
      });
    };
  };
};
