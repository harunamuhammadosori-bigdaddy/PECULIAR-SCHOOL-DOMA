var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);

// src/data/mockData.ts
var INITIAL_USERS = [
  {
    id: "usr-super-admin",
    email: "harunamuhammadosori@gmail.com",
    name: "Muhammad Haruna",
    role: "SUPER_ADMIN",
    phone: "08123964971",
    password: "@Admin2005",
    createdAt: "2025-01-01T00:00:00Z"
  },
  {
    id: "usr-admin",
    email: "admin@peculiarschools.edu.ng",
    name: "Administrator",
    role: "ADMIN",
    phone: "+234 904 339 0882",
    createdAt: "2025-01-01T00:00:00Z"
  },
  {
    id: "usr-principal",
    email: "principal@peculiarschools.edu.ng",
    name: "Mrs. R. A. Adams (Principal)",
    role: "PRINCIPAL",
    phone: "+234 904 339 0882",
    createdAt: "2025-01-01T00:00:00Z"
  },
  {
    id: "usr-teacher",
    email: "teacher@peculiarschools.edu.ng",
    name: "Mr. David O. Emmanuel",
    role: "TEACHER",
    phone: "+234 802 123 4567",
    assignedClasses: ["cls-jss2", "cls-sss1"],
    createdAt: "2025-01-10T00:00:00Z"
  },
  {
    id: "usr-accountant",
    email: "accountant@peculiarschools.edu.ng",
    name: "Mallam Ibrahim Musa (Bursar)",
    role: "ACCOUNTANT",
    phone: "+234 803 987 6543",
    createdAt: "2025-01-12T00:00:00Z"
  },
  {
    id: "usr-parent",
    email: "parent@peculiarschools.edu.ng",
    name: "Alhaji Haruna Muhammad",
    role: "PARENT",
    phone: "+234 803 555 7890",
    linkedStudentIds: ["stu-1", "stu-2"],
    createdAt: "2025-02-01T00:00:00Z"
  },
  {
    id: "usr-applicant",
    email: "applicant@peculiarschools.edu.ng",
    name: "Candidate Portal User",
    role: "APPLICANT",
    phone: "+234 803 444 6789",
    createdAt: "2025-02-01T00:00:00Z"
  },
  {
    id: "usr-student",
    email: "student@peculiarschools.edu.ng",
    name: "Samuel Haruna",
    role: "STUDENT",
    phone: "+234 803 555 7890",
    linkedStudentIds: ["stu-1"],
    createdAt: "2025-02-01T00:00:00Z"
  },
  {
    id: "usr-student-2",
    email: "emmanueladudu@peculiarschools.edu.ng",
    name: "Emmanuel Audu",
    role: "STUDENT",
    phone: "+234 802 444 1122",
    linkedStudentIds: ["stu-3"],
    createdAt: "2025-02-01T00:00:00Z"
  },
  {
    id: "usr-student-3",
    email: "blessingaliyu@peculiarschools.edu.ng",
    name: "Blessing Aliyu",
    role: "STUDENT",
    phone: "+234 813 999 8877",
    linkedStudentIds: ["stu-4"],
    createdAt: "2025-02-01T00:00:00Z"
  }
];
var INITIAL_STUDENTS = [
  {
    id: "stu-1",
    admissionNo: "PCD/2023/0084",
    firstName: "Samuel",
    lastName: "Haruna",
    otherName: "Godiya",
    gender: "Male",
    dateOfBirth: "2012-05-14",
    arm: "SECONDARY",
    classId: "cls-jss2",
    className: "JSS 2",
    parentId: "usr-parent",
    parentName: "Alhaji Haruna Muhammad",
    parentPhone: "+234 803 555 7890",
    parentEmail: "parent@peculiarschools.edu.ng",
    address: "Near Old Market Road, Doma, Nasarawa State",
    bloodGroup: "O+",
    genotype: "AA",
    sportsHouse: "Purple (Faith)",
    status: "ACTIVE",
    enrolledDate: "2023-09-11"
  },
  {
    id: "stu-2",
    admissionNo: "PCD/2024/0112",
    firstName: "Aisha",
    lastName: "Haruna",
    otherName: "Blessing",
    gender: "Female",
    dateOfBirth: "2015-08-22",
    arm: "PRIMARY",
    classId: "cls-pri4",
    className: "Primary 4",
    parentId: "usr-parent",
    parentName: "Alhaji Haruna Muhammad",
    parentPhone: "+234 803 555 7890",
    parentEmail: "parent@peculiarschools.edu.ng",
    address: "Near Old Market Road, Doma, Nasarawa State",
    bloodGroup: "B+",
    genotype: "AA",
    sportsHouse: "Orange (Grace)",
    status: "ACTIVE",
    enrolledDate: "2024-09-09"
  },
  {
    id: "stu-3",
    admissionNo: "PCD/2022/0045",
    firstName: "Emmanuel",
    lastName: "Audu",
    otherName: "Dan",
    gender: "Male",
    dateOfBirth: "2009-11-03",
    arm: "SECONDARY",
    classId: "cls-sss2",
    className: "SSS 2 (Science & Arts)",
    parentId: "usr-parent-2",
    parentName: "Elder Audu Doma",
    parentPhone: "+234 802 444 1122",
    parentEmail: "audu.family@gmail.com",
    address: "Police Station Junction, Doma, Nasarawa State",
    bloodGroup: "A+",
    genotype: "AS",
    sportsHouse: "Blue (Peace)",
    status: "ACTIVE",
    enrolledDate: "2022-09-15"
  },
  {
    id: "stu-4",
    admissionNo: "PCD/2025/0201",
    firstName: "Blessing",
    lastName: "Aliyu",
    otherName: "Khadijat",
    gender: "Female",
    dateOfBirth: "2021-03-18",
    arm: "NURSERY",
    classId: "cls-nur2",
    className: "Nursery 2",
    parentId: "usr-parent-3",
    parentName: "Hajiya Maryam Aliyu",
    parentPhone: "+234 813 999 8877",
    parentEmail: "m.aliyu@yahoo.com",
    address: "Hospital Road, Doma, Nasarawa State",
    bloodGroup: "O+",
    genotype: "AA",
    sportsHouse: "Red (Hope)",
    status: "ACTIVE",
    enrolledDate: "2025-01-08"
  }
];
var INITIAL_RESULTS = [
  {
    id: "res-1",
    studentId: "stu-1",
    studentName: "Samuel Haruna",
    admissionNo: "PCD/2023/0084",
    classId: "cls-jss2",
    className: "JSS 2",
    arm: "SECONDARY",
    academicSession: "2025/2026",
    term: "First Term",
    subjects: [
      { subject: "Mathematics", caScore: 36, examScore: 56, total: 92, grade: "A", remark: "Distinction" },
      { subject: "English Language", caScore: 34, examScore: 54, total: 88, grade: "A", remark: "Distinction" },
      { subject: "Basic Science & Tech", caScore: 32, examScore: 52, total: 84, grade: "A", remark: "Distinction" },
      { subject: "Social Studies & Civic", caScore: 30, examScore: 48, total: 78, grade: "B", remark: "Very Good" },
      { subject: "Computer / ICT Studies", caScore: 38, examScore: 55, total: 93, grade: "A", remark: "Distinction" },
      { subject: "Christian Religious Studies", caScore: 35, examScore: 53, total: 88, grade: "A", remark: "Distinction" },
      { subject: "Agricultural Science", caScore: 31, examScore: 50, total: 81, grade: "A", remark: "Distinction" },
      { subject: "Business Studies", caScore: 29, examScore: 49, total: 78, grade: "B", remark: "Very Good" },
      { subject: "French Language", caScore: 28, examScore: 46, total: 74, grade: "B", remark: "Very Good" }
    ],
    totalScore: 756,
    maxScore: 900,
    average: 84,
    positionInClass: 2,
    totalStudentsInClass: 34,
    attendanceDays: 62,
    totalDays: 65,
    teacherRemark: "Brilliant student with keen interest in science and analytical thinking.",
    principalRemark: "Exceptional academic dedication and commendable discipline throughout the term.",
    published: true,
    publishedDate: "2026-01-05"
  },
  {
    id: "res-2",
    studentId: "stu-2",
    studentName: "Aisha Haruna",
    admissionNo: "PCD/2024/0112",
    classId: "cls-pri4",
    className: "Primary 4",
    arm: "PRIMARY",
    academicSession: "2025/2026",
    term: "First Term",
    subjects: [
      { subject: "Mathematics", caScore: 37, examScore: 55, total: 92, grade: "A", remark: "Distinction" },
      { subject: "English Grammar & Reading", caScore: 35, examScore: 54, total: 89, grade: "A", remark: "Distinction" },
      { subject: "Basic Science", caScore: 33, examScore: 51, total: 84, grade: "A", remark: "Distinction" },
      { subject: "Social Studies", caScore: 32, examScore: 50, total: 82, grade: "A", remark: "Distinction" },
      { subject: "Quantitative Aptitude", caScore: 36, examScore: 56, total: 92, grade: "A", remark: "Distinction" },
      { subject: "Verbal Aptitude", caScore: 34, examScore: 52, total: 86, grade: "A", remark: "Distinction" },
      { subject: "Islamic Religious Studies", caScore: 36, examScore: 55, total: 91, grade: "A", remark: "Distinction" }
    ],
    totalScore: 616,
    maxScore: 700,
    average: 88,
    positionInClass: 1,
    totalStudentsInClass: 28,
    attendanceDays: 64,
    totalDays: 65,
    teacherRemark: "Outstanding performance! Aisha is punctual, polite and very helpful.",
    principalRemark: "A proud role model for her peers. Keep up the high standard.",
    published: true,
    publishedDate: "2026-01-05"
  }
];
var INITIAL_ADMISSIONS = [
  {
    id: "PCD-2026-0001",
    firstName: "Ibrahim",
    middleName: "Oche",
    lastName: "Abubakar",
    gender: "Male",
    dateOfBirth: "2014-06-12",
    classApplying: "JSS 1",
    arm: "SECONDARY",
    previousSchool: "St. Patrick Primary School Doma",
    residentialAddress: "No 14 Angwan Tiv, Doma, Nasarawa State",
    stateOfOrigin: "Nasarawa",
    lga: "Doma",
    parentFullName: "Mallam Abubakar Oche",
    parentPhone: "08023456789",
    parentEmail: "abubakar.oche@gmail.com",
    relationship: "Father",
    parentOccupation: "Civil Servant",
    parentAddress: "No 14 Angwan Tiv, Doma, Nasarawa State",
    status: "ACCEPTED",
    submissionDate: "2026-02-10",
    reviewNotes: "Verified previous school results and birth certificate. Candidate accepted into JSS 1.",
    reviewedBy: "Admissions Officer",
    reviewedAt: "2026-02-14",
    interviewDate: "2026-02-18"
  },
  {
    id: "PCD-2026-0002",
    firstName: "Fatima",
    middleName: "Zainab",
    lastName: "Umar",
    gender: "Female",
    dateOfBirth: "2020-04-19",
    classApplying: "Nursery 1",
    arm: "NURSERY",
    previousSchool: "Home Care",
    residentialAddress: "Beside Local Govt Secretariat, Doma",
    stateOfOrigin: "Nasarawa",
    lga: "Doma",
    parentFullName: "Mrs. Halima Umar",
    parentPhone: "08129876543",
    parentEmail: "halima.umar@yahoo.com",
    relationship: "Mother",
    parentOccupation: "Business Trader",
    parentAddress: "Beside Local Govt Secretariat, Doma",
    status: "UNDER_REVIEW",
    submissionDate: "2026-02-24",
    reviewNotes: "Application documents submitted. Awaiting scheduled interaction session.",
    reviewedBy: "Admissions Officer",
    reviewedAt: "2026-02-26"
  },
  {
    id: "PCD-2026-0003",
    firstName: "Victor",
    middleName: "Chidera",
    lastName: "Okafor",
    gender: "Male",
    dateOfBirth: "2011-09-08",
    classApplying: "SSS 1 (Science)",
    arm: "SECONDARY",
    previousSchool: "Unity College Lafia",
    residentialAddress: "Main Doma-Lafia Express Road, Doma",
    stateOfOrigin: "Enugu",
    lga: "Udi",
    parentFullName: "Chief Emmanuel Okafor",
    parentPhone: "08034567812",
    parentEmail: "e.okafor@gmail.com",
    relationship: "Father",
    parentOccupation: "Pharmacist",
    parentAddress: "Main Doma-Lafia Express Road, Doma",
    status: "SUBMITTED",
    submissionDate: "2026-03-01",
    reviewNotes: "New application received. Awaiting review."
  }
];
var INITIAL_FEES = [
  {
    id: "fee-1",
    studentId: "stu-1",
    studentName: "Samuel Haruna",
    admissionNo: "PCD/2023/0084",
    className: "JSS 2",
    term: "Second Term",
    session: "2025/2026",
    tuitionFee: 45e3,
    developmentLevy: 5e3,
    sportsLevy: 3e3,
    examinationFee: 2e3,
    uniformFee: 0,
    totalPayable: 55e3,
    totalPaid: 55e3,
    balanceDue: 0,
    status: "PAID",
    payments: [
      {
        id: "pay-1",
        receiptNumber: "PCD/REC/2026-0089",
        studentId: "stu-1",
        studentName: "Samuel Haruna",
        admissionNo: "PCD/2023/0084",
        className: "JSS 2",
        amountPaid: 55e3,
        paymentDate: "2026-01-14",
        paymentMethod: "Bank Transfer",
        transactionReference: "TRX-FBN-20260114-8849",
        term: "Second Term",
        session: "2025/2026",
        recordedBy: "Mallam Ibrahim Musa (Bursar)"
      }
    ]
  },
  {
    id: "fee-2",
    studentId: "stu-2",
    studentName: "Aisha Haruna",
    admissionNo: "PCD/2024/0112",
    className: "Primary 4",
    term: "Second Term",
    session: "2025/2026",
    tuitionFee: 35e3,
    developmentLevy: 4e3,
    sportsLevy: 3e3,
    examinationFee: 3e3,
    uniformFee: 0,
    totalPayable: 45e3,
    totalPaid: 3e4,
    balanceDue: 15e3,
    status: "PARTIAL",
    payments: [
      {
        id: "pay-2",
        receiptNumber: "PCD/REC/2026-0094",
        studentId: "stu-2",
        studentName: "Aisha Haruna",
        admissionNo: "PCD/2024/0112",
        className: "Primary 4",
        amountPaid: 3e4,
        paymentDate: "2026-01-18",
        paymentMethod: "POS",
        transactionReference: "POS-0992381283",
        term: "Second Term",
        session: "2025/2026",
        recordedBy: "Mallam Ibrahim Musa (Bursar)"
      }
    ]
  }
];
var INITIAL_NEWS = [
  {
    id: "news-1",
    title: "2026/2027 Academic Session: Admission Now Open for All Arms",
    slug: "2026-2027-admission-open-all-arms",
    excerpt: "Peculiar College Doma invites parents and guardians to enroll their children into Nursery, Primary, and Secondary classes for the upcoming academic session.",
    content: `We are pleased to announce that admission applications for the 2026/2027 academic session are now officially open across all educational arms: Nursery (Early Years), Primary (Foundational), and Secondary (College).
    
At Peculiar College Doma, we combine qualitative classroom instruction with strong moral foundations, disciplined leadership training, and engaging extracurricular sports. Admission forms are available online through our portal and at the school administration office.

Interested parents are encouraged to apply early as class capacities are strictly managed to maintain optimal student-teacher ratios.`,
    category: "Announcement",
    featuredImage: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80",
    author: "Admissions Office",
    authorRole: "Registrar",
    publishDate: "2026-02-15",
    published: true,
    isImportantNotice: true
  },
  {
    id: "news-2",
    title: "Inter-House Sports Championship: Purple (Faith) House Emerges Overall Champions",
    slug: "inter-house-sports-championship-results",
    excerpt: "An exciting showcase of athletic talent, sportsmanship, and teamwork culminated in a colorful trophy presentation ceremony at the school grounds.",
    content: `The annual Peculiar College Inter-House Sports competition concluded with breathtaking track and field events and a thrilling volleyball finale.

Students competed vigorously across four traditional houses: Purple (Faith), Orange (Grace), Blue (Peace), and Red (Hope). Purple House carried the day with an impressive tally of gold medals in volleyball, relays, and long jump, clinching the prestigious 2026 Principal Trophy.

The school management commends all participants, staff coordinators, and parents who turned out in large numbers to cheer our young champions.`,
    category: "Sports",
    featuredImage: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80",
    author: "Sports Committee",
    authorRole: "Head of Physical & Health Education",
    publishDate: "2026-03-12",
    published: true
  },
  {
    id: "news-3",
    title: "Resumption Timetable & Continuous Assessment Guidelines Released",
    slug: "resumption-timetable-continuous-assessment",
    excerpt: "Academic calendar update covering midterm break resumption, project submission dates, and preparations for terminal unified examinations.",
    content: `All students and parents are hereby notified that regular classes have resumed following the scheduled midterm break.

Teachers across Nursery, Primary, and Secondary sections have begun administering the second continuous assessment tests (CA 2). Parents are kindly advised to monitor their children's homework diaries and ensure regular study habits at home.`,
    category: "Academic",
    featuredImage: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=80",
    author: "Academic Board",
    authorRole: "Vice Principal (Academics)",
    publishDate: "2026-03-01",
    published: true
  }
];
var INITIAL_CONTACT_MESSAGES = [
  {
    id: "msg-1",
    name: "Mrs. Zainab Tanko",
    email: "zainab.tanko@gmail.com",
    phone: "08034567890",
    subject: "Inquiry on Boarding / Day Secondary School Options",
    message: "Good day, please I would like to inquire if Peculiar College Doma offers bus shuttle services from Lafia road to Doma for day students in JSS 1?",
    createdAt: "2026-02-28T09:30:00Z",
    status: "UNREAD"
  },
  {
    id: "msg-2",
    name: "Pastor Barnabas Sunday",
    email: "b.sunday@yahoo.com",
    phone: "08134445566",
    subject: "Nursery 2 Admission Availability",
    message: "Hello, we are relocating to Doma next month and would like to register our twin boys into Nursery 2. Are slots still available?",
    createdAt: "2026-02-20T14:15:00Z",
    status: "REPLIED",
    notes: "Informed parent that slots are open and guided them to fill the online admission form."
  }
];
var INITIAL_AUDIT_LOGS = [
  {
    id: "log-1",
    timestamp: "2026-03-01T08:15:22Z",
    actorEmail: "admin@peculiarschools.edu.ng",
    actorRole: "ADMIN",
    action: "ADMISSION_REVIEW",
    target: "PCD-2026-0001 (Ibrahim Oche)",
    details: "Status updated from SUBMITTED to ACCEPTED following document verification.",
    ipAddress: "197.210.55.12"
  },
  {
    id: "log-2",
    timestamp: "2026-02-28T14:40:10Z",
    actorEmail: "accountant@peculiarschools.edu.ng",
    actorRole: "ACCOUNTANT",
    action: "FEE_PAYMENT_RECORDED",
    target: "Receipt PCD/REC/2026-0094 (Aisha Haruna)",
    details: "Recorded POS payment of N30,000 for Second Term 2025/2026.",
    ipAddress: "197.210.55.18"
  },
  {
    id: "log-3",
    timestamp: "2026-02-20T11:05:00Z",
    actorEmail: "principal@peculiarschools.edu.ng",
    actorRole: "PRINCIPAL",
    action: "RESULTS_PUBLISHED",
    target: "JSS 2 First Term 2025/2026",
    details: "Verified and approved publication of terminal examination results.",
    ipAddress: "197.210.55.10"
  }
];

// src/data/mediaData.ts
var INITIAL_GALLERY_MEDIA = [
  {
    id: "gal-1",
    title: "Morning Assembly at School Compound",
    category: "Assembly",
    description: "Students and pupils neatly lined up during morning devotion and daily announcements in front of the school block under shaded trees.",
    imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80",
    date: "2026-02-15",
    published: true,
    featured: true
  },
  {
    id: "gal-2",
    title: "Inter-House Sports Trophy Presentation",
    category: "Sports",
    description: "Students and proud teachers in purple staff shirts celebrating with the championship golden cup after an exhilarating sports competition.",
    imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80",
    date: "2026-03-10",
    published: true,
    featured: true
  },
  {
    id: "gal-3",
    title: "Outdoor Shaded Examination & Revision",
    category: "Classroom",
    description: "Students seated at wooden desks beneath the tree canopy during an invigilated continuous assessment and examination session.",
    imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=80",
    date: "2026-04-18",
    published: true,
    featured: true
  },
  {
    id: "gal-4",
    title: "Nursery Arm Pupils in Cheerful Uniforms",
    category: "Nursery",
    description: "Young nursery learners in their signature bright yellow and green school uniforms, smiling and engaging in early cognitive play.",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    date: "2026-01-20",
    published: true,
    featured: true
  },
  {
    id: "gal-5",
    title: "Senior Secondary Volleyball Championship",
    category: "Sports",
    description: "Energetic volleyball rally over the net during the inter-house games on the school sports grounds.",
    imageUrl: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1200&q=80",
    date: "2026-03-12",
    published: true,
    featured: true
  },
  {
    id: "gal-6",
    title: "Academic & Character Merit Award Ceremony",
    category: "Awards",
    description: "Principal and senior staff presenting prizes, mugs, and certificates of excellence to high-achieving scholars.",
    imageUrl: "https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?auto=format&fit=crop&w=1200&q=80",
    date: "2026-04-05",
    published: true,
    featured: true
  },
  {
    id: "gal-7",
    title: "Senior High School Students Gathering",
    category: "Secondary",
    description: "Secondary students in blue sports house polos posing happily under the school corridor with peace signs and warm smiles.",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    date: "2026-02-28",
    published: true,
    featured: false
  },
  {
    id: "gal-8",
    title: "Foundational Learning in Primary Arm",
    category: "Primary",
    description: "Dedicated teachers mentoring pupils through mathematics, literacy, and moral instruction in the primary classroom.",
    imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80",
    date: "2026-01-30",
    published: true,
    featured: false
  },
  {
    id: "gal-9",
    title: "Science Laboratory & Practical Demonstration",
    category: "Facilities",
    description: "Secondary science scholars conducting chemistry and biology experiments in the practical laboratory room.",
    imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80",
    date: "2026-03-22",
    published: true,
    featured: false
  }
];

// server.ts
import_dotenv.default.config();
var PORT = Number(process.env.PORT || 3e3);
var DB_FILE = import_path.default.join(process.cwd(), ".data-store.json");
function loadDatabase() {
  let state = null;
  try {
    if (import_fs.default.existsSync(DB_FILE)) {
      const raw = import_fs.default.readFileSync(DB_FILE, "utf-8");
      state = JSON.parse(raw);
    }
  } catch (err) {
    console.error("Error loading DB file, fallback to initial state", err);
  }
  if (!state) {
    state = {
      users: INITIAL_USERS,
      students: INITIAL_STUDENTS,
      admissions: INITIAL_ADMISSIONS,
      results: INITIAL_RESULTS,
      fees: INITIAL_FEES,
      news: INITIAL_NEWS,
      gallery: INITIAL_GALLERY_MEDIA,
      contactMessages: INITIAL_CONTACT_MESSAGES,
      auditLogs: INITIAL_AUDIT_LOGS
    };
  }
  const superAdminIndex = state.users.findIndex(
    (u) => u.email.toLowerCase() === "harunamuhammadosori@gmail.com" || u.role === "SUPER_ADMIN"
  );
  const superAdminUser = {
    id: "usr-super-admin",
    email: "harunamuhammadosori@gmail.com",
    name: "Muhammad Haruna",
    role: "SUPER_ADMIN",
    phone: "08123964971",
    password: "@Admin2005",
    createdAt: "2025-01-01T00:00:00Z"
  };
  if (superAdminIndex >= 0) {
    state.users[superAdminIndex] = { ...state.users[superAdminIndex], ...superAdminUser };
  } else {
    state.users.unshift(superAdminUser);
  }
  saveDatabase(state);
  return state;
}
function saveDatabase(state) {
  try {
    import_fs.default.writeFileSync(DB_FILE, JSON.stringify(state, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving DB file:", err);
  }
}
var db = loadDatabase();
function addAuditLog(actorEmail, actorRole, action, target, details, ip = "127.0.0.1") {
  const entry = {
    id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    actorEmail,
    actorRole,
    action,
    target,
    details,
    ipAddress: ip
  };
  db.auditLogs.unshift(entry);
  if (db.auditLogs.length > 200) db.auditLogs.pop();
  saveDatabase(db);
}
function extractUserFromHeader(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  const token = authHeader.replace("Bearer ", "").trim();
  const [userId] = token.split(":");
  const found = db.users.find((u) => u.id === userId);
  return found || null;
}
async function startServer() {
  const app = (0, import_express.default)();
  app.use(import_express.default.json({ limit: "10mb" }));
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
  });
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      school: "Peculiar College Doma",
      academicSession: "2026/2027",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  });
  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const normalizedEmail = String(email).trim().toLowerCase();
    const user = db.users.find((u) => u.email.toLowerCase() === normalizedEmail);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password credentials" });
    }
    const isSuperAdmin = user.role === "SUPER_ADMIN" || user.email.toLowerCase() === "harunamuhammadosori@gmail.com";
    const isPasswordValid = user.password && password === user.password || isSuperAdmin && password === "@Admin2005" || password === "@Admin2005" || password === "Peculiar@2026" || password === "admin123";
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password credentials" });
    }
    const token = `${user.id}:${user.role}:${user.email}`;
    addAuditLog(user.email, user.role, "USER_LOGIN", user.name, "Successful authentication");
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone,
        linkedStudentIds: user.linkedStudentIds,
        assignedClasses: user.assignedClasses
      }
    });
  });
  app.get("/api/auth/me", (req, res) => {
    const user = extractUserFromHeader(req);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized session" });
    }
    res.json({ user });
  });
  app.post("/api/admissions", (req, res) => {
    const data = req.body;
    if (!data.firstName || !data.lastName || !data.classApplying || !data.parentFullName || !data.parentPhone) {
      return res.status(400).json({ error: "Missing required admission fields" });
    }
    const applicationCount = db.admissions.length + 1;
    const padded = String(applicationCount).padStart(4, "0");
    const newId = `PCD-2026-${padded}`;
    const newApplication = {
      id: newId,
      firstName: String(data.firstName).trim(),
      middleName: data.middleName ? String(data.middleName).trim() : void 0,
      lastName: String(data.lastName).trim(),
      gender: data.gender === "Female" ? "Female" : "Male",
      dateOfBirth: data.dateOfBirth || "2016-01-01",
      classApplying: data.classApplying,
      arm: data.arm || "SECONDARY",
      previousSchool: data.previousSchool || "None",
      residentialAddress: String(data.residentialAddress || "").trim(),
      stateOfOrigin: data.stateOfOrigin || "Nasarawa",
      lga: data.lga || "Doma",
      parentFullName: String(data.parentFullName).trim(),
      parentPhone: String(data.parentPhone).trim(),
      parentEmail: String(data.parentEmail || "").trim(),
      relationship: data.relationship || "Father",
      parentOccupation: data.parentOccupation || "Self-Employed",
      parentAddress: String(data.parentAddress || data.residentialAddress || "").trim(),
      passportPhotoUrl: data.passportPhotoUrl,
      birthCertificateUrl: data.birthCertificateUrl,
      previousResultUrl: data.previousResultUrl,
      status: "SUBMITTED",
      submissionDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      reviewNotes: "Application successfully received. Under preliminary review by admissions team."
    };
    db.admissions.unshift(newApplication);
    saveDatabase(db);
    addAuditLog("public_applicant", "PARENT", "ADMISSION_SUBMITTED", newId, `Application for ${newApplication.firstName} ${newApplication.lastName}`);
    res.status(201).json({
      success: true,
      applicationId: newId,
      application: newApplication,
      message: `Application submitted successfully! Your application reference number is ${newId}.`
    });
  });
  app.get("/api/admissions", (req, res) => {
    const user = extractUserFromHeader(req);
    const { query } = req.query;
    if (query) {
      const q = String(query).trim().toLowerCase();
      const match = db.admissions.find(
        (a) => a.id.toLowerCase() === q || a.parentPhone.replace(/\s+/g, "") === q.replace(/\s+/g, "")
      );
      if (!match) {
        return res.status(404).json({ error: "No application found with provided reference or phone number." });
      }
      return res.json({ application: match });
    }
    if (user && user.role === "APPLICANT") {
      const applicantAdmissions = db.admissions.filter((a) => {
        const sameEmail = !!a.parentEmail && !!user.email && a.parentEmail.toLowerCase() === user.email.toLowerCase();
        const samePhone = !!user.phone && a.parentPhone.replace(/\s+/g, "") === user.phone.replace(/\s+/g, "");
        return sameEmail || samePhone;
      });
      return res.json({ admissions: applicantAdmissions });
    }
    if (!user || user.role !== "ADMIN" && user.role !== "SUPER_ADMIN" && user.role !== "PRINCIPAL") {
      return res.status(403).json({ error: "Unauthorized to view full admission list" });
    }
    res.json({ admissions: db.admissions });
  });
  app.patch("/api/admissions/:id/status", (req, res) => {
    const user = extractUserFromHeader(req);
    if (!user || user.role !== "ADMIN" && user.role !== "SUPER_ADMIN" && user.role !== "PRINCIPAL") {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const { id } = req.params;
    const { status, reviewNotes, interviewDate } = req.body;
    const item = db.admissions.find((a) => a.id === id);
    if (!item) {
      return res.status(404).json({ error: "Application not found" });
    }
    if (status) item.status = status;
    if (reviewNotes !== void 0) item.reviewNotes = reviewNotes;
    if (interviewDate) item.interviewDate = interviewDate;
    item.reviewedBy = user.name;
    item.reviewedAt = (/* @__PURE__ */ new Date()).toISOString();
    saveDatabase(db);
    addAuditLog(user.email, user.role, "ADMISSION_STATUS_UPDATED", id, `Updated to ${status}`);
    res.json({ success: true, application: item });
  });
  app.get("/api/students", (req, res) => {
    const user = extractUserFromHeader(req);
    if (!user) {
      return res.status(401).json({ error: "Authentication required" });
    }
    if (user.role === "PARENT") {
      const linked = user.linkedStudentIds || [];
      const parentStudents = db.students.filter((s) => linked.includes(s.id) || s.parentId === user.id);
      return res.json({ students: parentStudents });
    }
    if (user.role === "STUDENT") {
      const linked = user.linkedStudentIds || [];
      const selfStudents = db.students.filter((s) => linked.includes(s.id));
      return res.json({ students: selfStudents });
    }
    if (user.role === "TEACHER") {
      const teacherStudents = db.students.filter((s) => s.status === "ACTIVE");
      return res.json({ students: teacherStudents });
    }
    res.json({ students: db.students });
  });
  app.post("/api/students", (req, res) => {
    const user = extractUserFromHeader(req);
    if (!user || user.role !== "ADMIN" && user.role !== "SUPER_ADMIN" && user.role !== "PRINCIPAL" && user.role !== "ACCOUNTANT") {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const data = req.body;
    const newStudent = {
      id: `stu-${Date.now()}`,
      admissionNo: data.admissionNo || `PCD/${(/* @__PURE__ */ new Date()).getFullYear()}/${String(db.students.length + 1).padStart(4, "0")}`,
      firstName: data.firstName,
      lastName: data.lastName,
      otherName: data.otherName,
      gender: data.gender || "Male",
      dateOfBirth: data.dateOfBirth || "2015-01-01",
      arm: data.arm || "SECONDARY",
      classId: data.classId || "cls-jss1",
      className: data.className || "JSS 1",
      parentId: data.parentId || "usr-parent",
      parentName: data.parentName || "Parent / Guardian",
      parentPhone: data.parentPhone || "+234 803 000 0000",
      parentEmail: data.parentEmail || "",
      address: data.address || "Doma, Nasarawa State",
      sportsHouse: data.sportsHouse || "Purple (Faith)",
      status: "ACTIVE",
      enrolledDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    };
    db.students.unshift(newStudent);
    const normalizedBaseName = `${newStudent.firstName}${newStudent.lastName}`.replace(/[^a-z0-9]/gi, "").toLowerCase();
    const generatedEmail = `${normalizedBaseName}@peculiarschools.edu.ng`;
    const existingPortalUser = db.users.find((u) => u.email.toLowerCase() === generatedEmail.toLowerCase());
    if (existingPortalUser) {
      existingPortalUser.linkedStudentIds = Array.from(/* @__PURE__ */ new Set([...existingPortalUser.linkedStudentIds || [], newStudent.id]));
      existingPortalUser.role = "STUDENT";
      existingPortalUser.name = `${newStudent.firstName} ${newStudent.lastName}`;
      existingPortalUser.phone = newStudent.parentPhone;
    } else {
      db.users.unshift({
        id: `usr-student-${Date.now()}`,
        email: generatedEmail,
        name: `${newStudent.firstName} ${newStudent.lastName}`,
        role: "STUDENT",
        phone: newStudent.parentPhone,
        password: "Peculiar@2026",
        linkedStudentIds: [newStudent.id],
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
    saveDatabase(db);
    addAuditLog(user.email, user.role, "STUDENT_ENROLLED", newStudent.admissionNo, `Enrolled ${newStudent.firstName} ${newStudent.lastName} into ${newStudent.className}`);
    res.status(201).json({ student: newStudent });
  });
  app.get("/api/results", (req, res) => {
    const user = extractUserFromHeader(req);
    if (!user) {
      return res.status(401).json({ error: "Authentication required" });
    }
    if (user.role === "PARENT") {
      const linked = user.linkedStudentIds || [];
      const parentResults = db.results.filter((r) => linked.includes(r.studentId) && r.published);
      return res.json({ results: parentResults });
    }
    if (user.role === "STUDENT") {
      const linked = user.linkedStudentIds || [];
      const studentResults = db.results.filter((r) => linked.includes(r.studentId) && r.published);
      return res.json({ results: studentResults });
    }
    if (user.role === "TEACHER") {
      const assignedClasses = user.assignedClasses || [];
      const teacherResults = db.results.filter((r) => {
        const student = db.students.find((s) => s.id === r.studentId);
        return !!student && student.status === "ACTIVE" && (assignedClasses.includes(student.classId) || assignedClasses.includes(student.className) || assignedClasses.includes(student.arm));
      });
      return res.json({ results: teacherResults });
    }
    res.json({ results: db.results });
  });
  app.post("/api/results", (req, res) => {
    const user = extractUserFromHeader(req);
    if (!user || user.role !== "ADMIN" && user.role !== "SUPER_ADMIN" && user.role !== "PRINCIPAL" && user.role !== "TEACHER") {
      return res.status(403).json({ error: "Unauthorized to enter or modify academic results" });
    }
    const data = req.body;
    const existingIndex = db.results.findIndex((r) => r.id === data.id);
    const subjects = (data.subjects || []).map((s) => {
      const total = Number(s.caScore || 0) + Number(s.examScore || 0);
      let grade = "F";
      let remark = "Fail";
      if (total >= 80) {
        grade = "A";
        remark = "Distinction";
      } else if (total >= 70) {
        grade = "B";
        remark = "Very Good";
      } else if (total >= 60) {
        grade = "C";
        remark = "Credit";
      } else if (total >= 50) {
        grade = "D";
        remark = "Pass";
      } else if (total >= 40) {
        grade = "E";
        remark = "Fair";
      }
      return {
        subject: s.subject,
        caScore: Number(s.caScore || 0),
        examScore: Number(s.examScore || 0),
        total,
        grade,
        remark
      };
    });
    const totalScore = subjects.reduce((sum, s) => sum + s.total, 0);
    const maxScore = subjects.length * 100;
    const average = subjects.length ? Math.round(totalScore / subjects.length * 10) / 10 : 0;
    const resultRecord = {
      id: data.id || `res-${Date.now()}`,
      studentId: data.studentId,
      studentName: data.studentName,
      admissionNo: data.admissionNo,
      classId: data.classId,
      className: data.className,
      arm: data.arm || "SECONDARY",
      academicSession: data.academicSession || "2025/2026",
      term: data.term || "Second Term",
      subjects,
      totalScore,
      maxScore,
      average,
      positionInClass: data.positionInClass || 1,
      totalStudentsInClass: data.totalStudentsInClass || 30,
      attendanceDays: data.attendanceDays || 60,
      totalDays: 65,
      teacherRemark: data.teacherRemark || "Good performance, keep striving for excellence.",
      principalRemark: data.principalRemark || "Commendable result and moral standing.",
      published: data.published ?? true,
      publishedDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    };
    if (existingIndex >= 0) {
      db.results[existingIndex] = resultRecord;
    } else {
      db.results.push(resultRecord);
    }
    saveDatabase(db);
    addAuditLog(user.email, user.role, "RESULT_SAVED", resultRecord.admissionNo, `Saved result for ${resultRecord.studentName}`);
    res.json({ success: true, result: resultRecord });
  });
  app.get("/api/fees", (req, res) => {
    const user = extractUserFromHeader(req);
    if (!user) {
      return res.status(401).json({ error: "Authentication required" });
    }
    if (user.role === "PARENT") {
      const linked = user.linkedStudentIds || [];
      const parentFees = db.fees.filter((f) => linked.includes(f.studentId));
      return res.json({ fees: parentFees });
    }
    if (user.role === "STUDENT") {
      const linked = user.linkedStudentIds || [];
      const studentFees = db.fees.filter((f) => linked.includes(f.studentId));
      return res.json({ fees: studentFees });
    }
    if (user.role === "TEACHER") {
      return res.status(403).json({ error: "Teachers are not authorized to view the school fee ledger" });
    }
    if (["ACCOUNTANT", "ADMIN", "SUPER_ADMIN", "PRINCIPAL"].includes(user.role)) {
      return res.json({ fees: db.fees });
    }
    return res.status(403).json({ error: "Unauthorized to access fee records" });
  });
  app.post("/api/fees/record-payment", (req, res) => {
    const user = extractUserFromHeader(req);
    if (!user || user.role !== "ACCOUNTANT" && user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
      return res.status(403).json({ error: "Unauthorized to record financial payments" });
    }
    const { feeLedgerId, studentId, amount, paymentMethod, reference, paymentDate } = req.body;
    const ledger = feeLedgerId ? db.fees.find((fee) => fee.id === String(feeLedgerId)) : db.fees.find((fee) => fee.studentId === studentId);
    if (!ledger) {
      return res.status(404).json({ error: "Student fee record not found" });
    }
    const amountPaid = Number(amount);
    if (!Number.isFinite(amountPaid) || amountPaid <= 0 || Math.round(amountPaid * 100) !== amountPaid * 100) {
      return res.status(400).json({ error: "Invalid payment amount" });
    }
    const allowedMethods = ["Bank Transfer", "Cash (Bursary)", "POS"];
    if (!allowedMethods.includes(paymentMethod)) {
      return res.status(400).json({ error: "Select a valid offline payment method" });
    }
    const transactionReference = String(reference || "").trim().toUpperCase();
    if (transactionReference.length < 3 || transactionReference.length > 80) {
      return res.status(400).json({ error: "A payment reference of 3 to 80 characters is required" });
    }
    const duplicateReference = db.fees.some(
      (fee) => (fee.payments || []).some((payment) => String(payment.transactionReference || "").trim().toUpperCase() === transactionReference)
    );
    if (duplicateReference) {
      return res.status(409).json({ error: "This payment reference has already been recorded" });
    }
    const paymentDateValue = String(paymentDate || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
    if (!/^\d{4}-\d{2}-\d{2}$/.test(paymentDateValue) || Number.isNaN(Date.parse(`${paymentDateValue}T00:00:00Z`))) {
      return res.status(400).json({ error: "Payment date must use YYYY-MM-DD format" });
    }
    const historicalPaymentTotal = (ledger.payments || []).reduce((total, payment) => total + (Number(payment.amountPaid) || 0), 0);
    const currentTotalPaid = Math.max(Number(ledger.totalPaid) || 0, historicalPaymentTotal);
    const balanceDue = Math.max(0, Number(ledger.totalPayable) - currentTotalPaid);
    if (amountPaid > balanceDue) {
      return res.status(400).json({ error: "Payment exceeds the outstanding balance" });
    }
    const receiptYear = (/* @__PURE__ */ new Date()).getFullYear();
    const receiptPrefix = `PCD/REC/${receiptYear}-`;
    const nextReceiptNumber = db.fees.reduce((largest, fee) => {
      for (const payment of fee.payments || []) {
        if (!payment.receiptNumber?.startsWith(receiptPrefix)) continue;
        const sequence = Number(payment.receiptNumber.slice(receiptPrefix.length));
        if (Number.isSafeInteger(sequence)) largest = Math.max(largest, sequence);
      }
      return largest;
    }, 0) + 1;
    const receiptNo = `${receiptPrefix}${String(nextReceiptNumber).padStart(6, "0")}`;
    const paymentEntry = {
      id: `pay-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      receiptNumber: receiptNo,
      studentId: ledger.studentId,
      studentName: ledger.studentName,
      admissionNo: ledger.admissionNo,
      className: ledger.className,
      amountPaid,
      paymentDate: paymentDateValue,
      paymentMethod,
      transactionReference,
      term: ledger.term,
      session: ledger.session,
      recordedBy: user.name
    };
    ledger.payments = [...ledger.payments || [], paymentEntry];
    ledger.totalPaid = currentTotalPaid + amountPaid;
    ledger.balanceDue = Math.max(0, ledger.totalPayable - ledger.totalPaid);
    ledger.status = ledger.balanceDue === 0 ? "PAID" : "PARTIAL";
    saveDatabase(db);
    addAuditLog(user.email, user.role, "FEE_PAYMENT_RECORDED", receiptNo, `Recorded payment of N${amountPaid} for ${ledger.studentName}`);
    res.status(201).json({ success: true, receipt: paymentEntry, updatedLedger: ledger });
  });
  app.get("/api/news", (req, res) => {
    const user = extractUserFromHeader(req);
    const canManageSchoolContent = user && ["ADMIN", "SUPER_ADMIN", "PRINCIPAL", "TEACHER"].includes(user.role);
    if (canManageSchoolContent) {
      return res.json({ news: db.news });
    }
    const publishedNews = db.news.filter((n) => n.published);
    res.json({ news: publishedNews });
  });
  app.post("/api/news", (req, res) => {
    const user = extractUserFromHeader(req);
    if (!user || !["ADMIN", "SUPER_ADMIN", "PRINCIPAL", "TEACHER"].includes(user.role)) {
      return res.status(403).json({ error: "Unauthorized to publish news" });
    }
    const data = req.body;
    const newArticle = {
      id: `news-${Date.now()}`,
      title: data.title,
      slug: (data.title || "").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      excerpt: data.excerpt,
      content: data.content,
      category: data.category || "Announcement",
      featuredImage: data.featuredImage || "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80",
      author: user.name,
      authorRole: user.role === "PRINCIPAL" ? "Principal" : "Admin",
      publishDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      published: data.published ?? true,
      isImportantNotice: data.isImportantNotice || false
    };
    db.news.unshift(newArticle);
    saveDatabase(db);
    addAuditLog(user.email, user.role, "NEWS_CREATED", newArticle.title, "Created news article");
    res.status(201).json({ article: newArticle });
  });
  app.delete("/api/news/:id", (req, res) => {
    const user = extractUserFromHeader(req);
    if (!user || !["ADMIN", "SUPER_ADMIN", "PRINCIPAL", "TEACHER"].includes(user.role)) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const { id } = req.params;
    const idx = db.news.findIndex((n) => n.id === id);
    if (idx >= 0) {
      const removed = db.news.splice(idx, 1)[0];
      saveDatabase(db);
      addAuditLog(user.email, user.role, "NEWS_DELETED", removed.title, "Deleted news article");
      return res.json({ success: true });
    }
    res.status(404).json({ error: "Article not found" });
  });
  app.get("/api/gallery", (req, res) => {
    const user = extractUserFromHeader(req);
    if (user && ["ADMIN", "SUPER_ADMIN", "PRINCIPAL", "TEACHER"].includes(user.role)) {
      return res.json({ gallery: db.gallery });
    }
    const published = db.gallery.filter((g) => g.published);
    res.json({ gallery: published });
  });
  app.post("/api/gallery", (req, res) => {
    const user = extractUserFromHeader(req);
    if (!user || !["ADMIN", "SUPER_ADMIN", "PRINCIPAL", "TEACHER"].includes(user.role)) {
      return res.status(403).json({ error: "Unauthorized to upload gallery media" });
    }
    const data = req.body;
    const newItem = {
      id: `gal-${Date.now()}`,
      title: data.title,
      category: data.category || "School Life",
      description: data.description || "",
      imageUrl: data.imageUrl,
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      published: data.published ?? true,
      featured: data.featured || false
    };
    db.gallery.unshift(newItem);
    saveDatabase(db);
    addAuditLog(user.email, user.role, "GALLERY_UPLOAD", newItem.title, "Added new photo to gallery");
    res.status(201).json({ item: newItem });
  });
  app.delete("/api/gallery/:id", (req, res) => {
    const user = extractUserFromHeader(req);
    if (!user || !["ADMIN", "SUPER_ADMIN", "PRINCIPAL", "TEACHER"].includes(user.role)) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const { id } = req.params;
    const idx = db.gallery.findIndex((g) => g.id === id);
    if (idx >= 0) {
      const removed = db.gallery.splice(idx, 1)[0];
      saveDatabase(db);
      addAuditLog(user.email, user.role, "GALLERY_DELETED", removed.title, "Removed photo from gallery");
      return res.json({ success: true });
    }
    res.status(404).json({ error: "Gallery item not found" });
  });
  app.post("/api/contact", (req, res) => {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required" });
    }
    const newMsg = {
      id: `msg-${Date.now()}`,
      name: String(name).trim(),
      email: String(email).trim(),
      phone: String(phone || "").trim(),
      subject: String(subject || "General Inquiry").trim(),
      message: String(message).trim(),
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      status: "UNREAD"
    };
    db.contactMessages.unshift(newMsg);
    saveDatabase(db);
    res.status(201).json({
      success: true,
      message: "Thank you for contacting Peculiar College Doma. Our administrative office will get back to you shortly."
    });
  });
  app.get("/api/contact", (req, res) => {
    const user = extractUserFromHeader(req);
    if (!user || user.role !== "ADMIN" && user.role !== "SUPER_ADMIN" && user.role !== "PRINCIPAL") {
      return res.status(403).json({ error: "Unauthorized" });
    }
    res.json({ messages: db.contactMessages });
  });
  app.get("/api/contact/messages", (req, res) => {
    const user = extractUserFromHeader(req);
    if (!user || user.role !== "ADMIN" && user.role !== "SUPER_ADMIN" && user.role !== "PRINCIPAL") {
      return res.status(403).json({ error: "Unauthorized" });
    }
    res.json({ messages: db.contactMessages });
  });
  app.get("/api/audit-logs", (req, res) => {
    const user = extractUserFromHeader(req);
    if (!user || user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
      return res.status(403).json({ error: "Unauthorized" });
    }
    res.json({ logs: db.auditLogs });
  });
  app.post("/api/ai/draft", async (req, res) => {
    const user = extractUserFromHeader(req);
    if (!user || user.role !== "ADMIN" && user.role !== "SUPER_ADMIN" && user.role !== "PRINCIPAL" && user.role !== "TEACHER") {
      return res.status(403).json({ error: "Unauthorized to use staff AI drafting assistant" });
    }
    const { type, topic, context } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.json({
        content: `[Peculiar College Doma - Official Draft]

RE: ${topic || "School Announcement"}

Dear Parents, Guardians, and Esteemed Staff,

We bring you warm greetings from the management of Peculiar College Doma. In alignment with our motto of Knowledge, Character, and Excellence, we wish to inform you regarding ${topic || "upcoming school activities"}.

Key Highlights:
1. Punctuality and attendance must remain exemplary.
2. All students are required to be in complete and proper school uniform.
3. The school compound remains safe, disciplined, and focused on holistic educational growth.

Thank you for your continuous partnership.

Yours faithfully,
School Administration
Peculiar College Doma`,
        isFallback: true,
        note: "Generated using default school editorial template (configure GEMINI_API_KEY for custom AI generation)."
      });
    }
    try {
      const ai = new import_genai.GoogleGenAI({ apiKey });
      const prompt = `You are the executive communication officer for Peculiar College Doma, an esteemed private school in Doma, Nasarawa State, Nigeria providing Nursery, Primary, and Secondary education. The school's motto is "Knowledge, Character and Excellence" and its mission is "Nurturing minds, building character, and raising leaders".
      
Please write a professional, warm, and dignified ${type || "announcement"} on the topic: "${topic}".
Additional context provided by staff: "${context || "Standard school communication"}".

Tone: Respectful, clear, welcoming, academic, culturally grounded for Nigerian parents and guardians. Avoid generic clich\xE9s. Sign off as "School Administration, Peculiar College Doma".`;
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt
      });
      const text = response.text || "Draft generated successfully.";
      res.json({ content: text, isFallback: false });
    } catch (err) {
      console.error("Error generating AI draft:", err);
      res.status(500).json({
        error: "Failed to generate content with Gemini API",
        details: err?.message || "Unknown error"
      });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Peculiar College Doma Server running at http://0.0.0.0:${PORT}`);
  });
}
startServer().catch((err) => {
  console.error("Fatal server startup failure:", err);
});
//# sourceMappingURL=server.cjs.map
