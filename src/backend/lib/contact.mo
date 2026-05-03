import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/contact";

module {
  public func submit(
    submissions : List.List<Types.ContactSubmission>,
    nextId : { var val : Nat },
    name : Text,
    email : Text,
    phone : Text,
    programInterest : Text,
    message : Text,
  ) : Bool {
    let id = nextId.val;
    nextId.val += 1;
    submissions.add({
      id;
      name;
      email;
      phone;
      programInterest;
      message;
      createdAt = Time.now();
    });
    true;
  };

  public func getAll(submissions : List.List<Types.ContactSubmission>) : [Types.ContactSubmission] {
    submissions.toArray();
  };

  public func submitAppointment(
    appointments : List.List<Types.Appointment>,
    nextId : { var val : Nat },
    name : Text,
    email : Text,
    phone : Text,
    serviceType : Text,
    preferredDate : Text,
    message : Text,
  ) : Bool {
    let id = nextId.val;
    nextId.val += 1;
    appointments.add({
      id;
      name;
      email;
      phone;
      serviceType;
      preferredDate;
      message;
      createdAt = Time.now();
    });
    true;
  };

  public func getAllAppointments(appointments : List.List<Types.Appointment>) : [Types.Appointment] {
    appointments.toArray();
  };
};
