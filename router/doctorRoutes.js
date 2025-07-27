import express from "express";
const router = express.Router();

// 👨‍⚕️ Fake Doctor Data
const fakeDoctors = [
  {
    id: 1,
    name: "Dr. Aisha Verma",
    specialization: "Cardiologist",
    experience: "12 years",
    location: "Mumbai, India",
    availability: ["Mon", "Wed", "Fri"],
    // fees: 1200,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Dr. Rajesh Mehta",
    specialization: "Orthopedic Surgeon",
    experience: "15 years",
    location: "Delhi, India",
    availability: ["Tue", "Thu", "Sat"],
    // fees: 1000,
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 3,
    name: "Dr. Sneha Iyer",
    specialization: "Dermatologist",
    experience: "8 years",
    location: "Bangalore, India",
    availability: ["Mon", "Tue", "Fri"],
    // fees: 850,
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 4,
    name: "Dr. Arjun Nair",
    specialization: "Neurologist",
    experience: "10 years",
    location: "Chennai, India",
    availability: ["Wed", "Thu"],
    // fees: 1400,
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: 5,
    name: "Dr. Priya Kapoor",
    specialization: "Pediatrician",
    experience: "6 years",
    location: "Kolkata, India",
    availability: ["Mon", "Wed", "Sat"],
    // fees: 900,
    image: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    id: 6,
    name: "Dr. Vikram Desai",
    specialization: "ENT Specialist",
    experience: "9 years",
    location: "Ahmedabad, India",
    availability: ["Tue", "Thu", "Sun"],
    // fees: 750,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 7,
    name: "Dr. Meera Joshi",
    specialization: "Gynecologist",
    experience: "11 years",
    location: "Pune, India",
    availability: ["Mon", "Thu", "Fri"],
    // fees: 1100,
    image: "https://randomuser.me/api/portraits/women/19.jpg",
  },
];


// 🔍 Get All Doctors
router.get("/doctors", (req, res) => {
  res.json(fakeDoctors);
});


export default router;




