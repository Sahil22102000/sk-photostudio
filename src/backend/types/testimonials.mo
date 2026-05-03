import Common "common";

module {
  public type Testimonial = {
    id : Nat;
    name : Text;
    role : Text;
    quote : Text;
    rating : Nat;
    createdAt : Common.Timestamp;
  };
};
