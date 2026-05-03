import Common "common";

module {
  public type ContactSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    programInterest : Text;
    message : Text;
    createdAt : Common.Timestamp;
  };

  public type Appointment = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    serviceType : Text;
    preferredDate : Text;
    message : Text;
    createdAt : Common.Timestamp;
  };
};
