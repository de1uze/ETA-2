// staffInfo.js
const deviceIds = [
  5515885, 7065309, 7065312, 5515884, 7065308, 7667786, 4275069, 4275048, 
  4275065, 5515865, 5515872, 5515879, 7667787, 7667788, 7667789, 7667790, 
  7667791, 7667792, 7667793, 7667794, 7667795, 7667796, 7667797, 7667798, 
  7667799, 7667800, 7667801, 7667802, 8268371, 8268372, 4856413, 4856420
];

// Assign device IDs to buses and their staff
const staffInfo = [
  // Bus MBMT 1
  { id: 1, name: "Rajesh Kumar", role: "Bus Driver", bus: "MBMT 1", contactNumber: "+91-9823456789", email: "rajesh.kumar@example.com", deviceId: deviceIds[0] },
  { id: 2, name: "Sunita Sharma", role: "Conductor", bus: "MBMT 1", contactNumber: "+91-9823456790", email: "sunita.sharma@example.com", deviceId: deviceIds[0] },

  // Bus MBMT 2
  { id: 3, name: "Amit Patel", role: "Bus Driver", bus: "MBMT 2", contactNumber: "+91-9823456791", email: "amit.patel@example.com", deviceId: deviceIds[1] },
  { id: 4, name: "Neha Singh", role: "Conductor", bus: "MBMT 2", contactNumber: "+91-9823456792", email: "neha.singh@example.com", deviceId: deviceIds[1] },

  // Bus MBMT 3
  { id: 5, name: "Ravi Sharma", role: "Bus Driver", bus: "MBMT 3", contactNumber: "+91-9823456793", email: "ravi.sharma@example.com", deviceId: deviceIds[2] },
  { id: 6, name: "Anjali Mehta", role: "Conductor", bus: "MBMT 3", contactNumber: "+91-9823456794", email: "anjali.mehta@example.com", deviceId: deviceIds[2] },

  // Bus MBMT 4
  { id: 7, name: "Manoj Kumar", role: "Bus Driver", bus: "MBMT 4", contactNumber: "+91-9823456795", email: "manoj.kumar@example.com", deviceId: deviceIds[3] },
  { id: 8, name: "Pooja Agarwal", role: "Conductor", bus: "MBMT 4", contactNumber: "+91-9823456796", email: "pooja.agarwal@example.com", deviceId: deviceIds[3] },

  // Bus MBMT 5
  { id: 9, name: "Suresh Yadav", role: "Bus Driver", bus: "MBMT 5", contactNumber: "+91-9823456797", email: "suresh.yadav@example.com", deviceId: deviceIds[4] },
  { id: 10, name: "Rita Gupta", role: "Conductor", bus: "MBMT 5", contactNumber: "+91-9823456798", email: "rita.gupta@example.com", deviceId: deviceIds[4] },

  // Bus MBMT 6
  { id: 11, name: "Vikram Singh", role: "Bus Driver", bus: "MBMT 6", contactNumber: "+91-9823456799", email: "vikram.singh@example.com", deviceId: deviceIds[5] },
  { id: 12, name: "Suman Sharma", role: "Conductor", bus: "MBMT 6", contactNumber: "+91-9823456800", email: "suman.sharma@example.com", deviceId: deviceIds[5] },

  // Bus MBMT 7
  { id: 13, name: "Deepak Patel", role: "Bus Driver", bus: "MBMT 7", contactNumber: "+91-9823456801", email: "deepak.patel@example.com", deviceId: deviceIds[6] },
  { id: 14, name: "Sonali Deshmukh", role: "Conductor", bus: "MBMT 7", contactNumber: "+91-9823456802", email: "sonali.deshmukh@example.com", deviceId: deviceIds[6] },

  // Bus MBMT 8
  { id: 15, name: "Raj Kumar", role: "Bus Driver", bus: "MBMT 8", contactNumber: "+91-9823456803", email: "raj.kumar@example.com", deviceId: deviceIds[7] },
  { id: 16, name: "Madhuri Joshi", role: "Conductor", bus: "MBMT 8", contactNumber: "+91-9823456804", email: "madhuri.joshi@example.com", deviceId: deviceIds[7] },

  // Bus MBMT 9
  { id: 17, name: "Anil Mehta", role: "Bus Driver", bus: "MBMT 9", contactNumber: "+91-9823456805", email: "anil.mehta@example.com", deviceId: deviceIds[8] },
  { id: 18, name: "Kiran Bhat", role: "Conductor", bus: "MBMT 9", contactNumber: "+91-9823456806", email: "kiran.bhat@example.com", deviceId: deviceIds[8] },

  // Bus MBMT 10
  { id: 19, name: "Dinesh Kumar", role: "Bus Driver", bus: "MBMT 10", contactNumber: "+91-9823456807", email: "dinesh.kumar@example.com", deviceId: deviceIds[9] },
  { id: 20, name: "Sangeeta Devi", role: "Conductor", bus: "MBMT 10", contactNumber: "+91-9823456808", email: "sangeeta.devi@example.com", deviceId: deviceIds[9] },

  // Bus MBMT 11
  { id: 21, name: "Ramesh Kumar", role: "Bus Driver", bus: "MBMT 11", contactNumber: "+91-9823456809", email: "ramesh.kumar@example.com", deviceId: deviceIds[10] },
  { id: 22, name: "Pinki Singh", role: "Conductor", bus: "MBMT 11", contactNumber: "+91-9823456810", email: "pinki.singh@example.com", deviceId: deviceIds[10] },

  // Bus MBMT 12
  { id: 23, name: "Gaurav Joshi", role: "Bus Driver", bus: "MBMT 12", contactNumber: "+91-9823456811", email: "gaurav.joshi@example.com", deviceId: deviceIds[11] },
  { id: 24, name: "Kavita Sharma", role: "Conductor", bus: "MBMT 12", contactNumber: "+91-9823456812", email: "kavita.sharma@example.com", deviceId: deviceIds[11] },

  // Bus MBMT 13
  { id: 25, name: "Nitin Patel", role: "Bus Driver", bus: "MBMT 13", contactNumber: "+91-9823456813", email: "nitin.patel@example.com", deviceId: deviceIds[12] },
  { id: 26, name: "Rekha Agarwal", role: "Conductor", bus: "MBMT 13", contactNumber: "+91-9823456814", email: "rekha.agarwal@example.com", deviceId: deviceIds[12] },

  // Bus MBMT 14
  { id: 27, name: "Rajeev Kumar", role: "Bus Driver", bus: "MBMT 14", contactNumber: "+91-9823456815", email: "rajeev.kumar@example.com", deviceId: deviceIds[13] },
  { id: 28, name: "Jaya Gupta", role: "Conductor", bus: "MBMT 14", contactNumber: "+91-9823456816", email: "jaya.gupta@example.com", deviceId: deviceIds[13] },

  // Bus MBMT 15
  { id: 29, name: "Amit Sharma", role: "Bus Driver", bus: "MBMT 15", contactNumber: "+91-9823456817", email: "amit.sharma@example.com", deviceId: deviceIds[14] },
  { id: 30, name: "Anita Mehta", role: "Conductor", bus: "MBMT 15", contactNumber: "+91-9823456818", email: "anita.mehta@example.com", deviceId: deviceIds[14] },

  // Additional Buses with Device IDs
  { id: 31, name: "Harish Verma", role: "Bus Driver", bus: "MBMT 16", contactNumber: "+91-9823456819", email: "harish.verma@example.com", deviceId: deviceIds[15] },
  { id: 32, name: "Rita Kumari", role: "Conductor", bus: "MBMT 16", contactNumber: "+91-9823456820", email: "rita.kumari@example.com", deviceId: deviceIds[15] },

  { id: 33, name: "Pawan Yadav", role: "Bus Driver", bus: "MBMT 17", contactNumber: "+91-9823456821", email: "pawan.yadav@example.com", deviceId: deviceIds[16] },
  { id: 34, name: "Meena Devi", role: "Conductor", bus: "MBMT 17", contactNumber: "+91-9823456822", email: "meena.devi@example.com", deviceId: deviceIds[16] },

  { id: 35, name: "Rajendra Singh", role: "Bus Driver", bus: "MBMT 18", contactNumber: "+91-9823456823", email: "rajendra.singh@example.com", deviceId: deviceIds[17] },
  { id: 36, name: "Poonam Sharma", role: "Conductor", bus: "MBMT 18", contactNumber: "+91-9823456824", email: "poonam.sharma@example.com", deviceId: deviceIds[17] },

  { id: 37, name: "Deepika Mehta", role: "Bus Driver", bus: "MBMT 19", contactNumber: "+91-9823456825", email: "deepika.mehta@example.com", deviceId: deviceIds[18] },
  { id: 38, name: "Ravi Gupta", role: "Conductor", bus: "MBMT 19", contactNumber: "+91-9823456826", email: "ravi.gupta@example.com", deviceId: deviceIds[18] },

  { id: 39, name: "Sunil Kumar", role: "Bus Driver", bus: "MBMT 20", contactNumber: "+91-9823456827", email: "sunil.kumar@example.com", deviceId: deviceIds[19] },
  { id: 40, name: "Kavita Agarwal", role: "Conductor", bus: "MBMT 20", contactNumber: "+91-9823456828", email: "kavita.agarwal@example.com", deviceId: deviceIds[19] },

  { id: 41, name: "Anil Kumar", role: "Bus Driver", bus: "MBMT 21", contactNumber: "+91-9823456829", email: "anil.kumar@example.com", deviceId: deviceIds[20] },
  { id: 42, name: "Renu Sharma", role: "Conductor", bus: "MBMT 21", contactNumber: "+91-9823456830", email: "renu.sharma@example.com", deviceId: deviceIds[20] },

  { id: 43, name: "Jitendra Patel", role: "Bus Driver", bus: "MBMT 22", contactNumber: "+91-9823456831", email: "jitendra.patel@example.com", deviceId: deviceIds[21] },
  { id: 44, name: "Sushila Devi", role: "Conductor", bus: "MBMT 22", contactNumber: "+91-9823456832", email: "sushila.devi@example.com", deviceId: deviceIds[21] },

  { id: 45, name: "Mohan Singh", role: "Bus Driver", bus: "MBMT 23", contactNumber: "+91-9823456833", email: "mohan.singh@example.com", deviceId: deviceIds[22] },
  { id: 46, name: "Seema Agarwal", role: "Conductor", bus: "MBMT 23", contactNumber: "+91-9823456834", email: "seema.agarwal@example.com", deviceId: deviceIds[22] },

  { id: 47, name: "Keshav Sharma", role: "Bus Driver", bus: "MBMT 24", contactNumber: "+91-9823456835", email: "keshav.sharma@example.com", deviceId: deviceIds[23] },
  { id: 48, name: "Neelam Kumari", role: "Conductor", bus: "MBMT 24", contactNumber: "+91-9823456836", email: "neelam.kumari@example.com", deviceId: deviceIds[23] },

  { id: 49, name: "Suraj Kumar", role: "Bus Driver", bus: "MBMT 25", contactNumber: "+91-9823456837", email: "suraj.kumar@example.com", deviceId: deviceIds[24] },
  { id: 50, name: "Priya Agarwal", role: "Conductor", bus: "MBMT 25", contactNumber: "+91-9823456838", email: "priya.agarwal@example.com", deviceId: deviceIds[24] },

  { id: 51, name: "Gaurav Mehta", role: "Bus Driver", bus: "MBMT 26", contactNumber: "+91-9823456839", email: "gaurav.mehta@example.com", deviceId: deviceIds[25] },
  { id: 52, name: "Neha Singh", role: "Conductor", bus: "MBMT 26", contactNumber: "+91-9823456840", email: "neha.singh@example.com", deviceId: deviceIds[25] },

  { id: 53, name: "Ravi Kumar", role: "Bus Driver", bus: "MBMT 27", contactNumber: "+91-9823456841", email: "ravi.kumar@example.com", deviceId: deviceIds[26] },
  { id: 54, name: "Sunita Sharma", role: "Conductor", bus: "MBMT 27", contactNumber: "+91-9823456842", email: "sunita.sharma@example.com", deviceId: deviceIds[26] },

  { id: 55, name: "Manoj Yadav", role: "Bus Driver", bus: "MBMT 28", contactNumber: "+91-9823456843", email: "manoj.yadav@example.com", deviceId: deviceIds[27] },
  { id: 56, name: "Anjali Gupta", role: "Conductor", bus: "MBMT 28", contactNumber: "+91-9823456844", email: "anjali.gupta@example.com", deviceId: deviceIds[27] },

  { id: 57, name: "Rajesh Verma", role: "Bus Driver", bus: "MBMT 29", contactNumber: "+91-9823456845", email: "rajesh.verma@example.com", deviceId: deviceIds[28] },
  { id: 58, name: "Rita Sharma", role: "Conductor", bus: "MBMT 29", contactNumber: "+91-9823456846", email: "rita.sharma@example.com", deviceId: deviceIds[28] },

  { id: 59, name: "Ravi Singh", role: "Bus Driver", bus: "MBMT 30", contactNumber: "+91-9823456847", email: "ravi.singh@example.com", deviceId: deviceIds[29] },
  { id: 60, name: "Suman Kumar", role: "Conductor", bus: "MBMT 30", contactNumber: "+91-9823456848", email: "suman.kumar@example.com", deviceId: deviceIds[29] }
];

export default staffInfo;
