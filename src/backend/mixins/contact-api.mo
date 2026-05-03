import List "mo:core/List";
import ContactLib "../lib/contact";
import Types "../types/contact";

mixin (
  submissions : List.List<Types.ContactSubmission>,
  nextSubmissionId : { var val : Nat },
  appointments : List.List<Types.Appointment>,
  nextAppointmentId : { var val : Nat },
) {
  public func submitContactForm(
    name : Text,
    email : Text,
    phone : Text,
    programInterest : Text,
    message : Text,
  ) : async Bool {
    ContactLib.submit(submissions, nextSubmissionId, name, email, phone, programInterest, message);
  };

  public query func getContactSubmissions() : async [Types.ContactSubmission] {
    ContactLib.getAll(submissions);
  };

  public func submitAppointment(
    name : Text,
    email : Text,
    phone : Text,
    serviceType : Text,
    preferredDate : Text,
    message : Text,
  ) : async Bool {
    ContactLib.submitAppointment(appointments, nextAppointmentId, name, email, phone, serviceType, preferredDate, message);
  };

  public query func getAppointments() : async [Types.Appointment] {
    ContactLib.getAllAppointments(appointments);
  };
};
