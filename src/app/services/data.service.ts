import { Injectable, signal, computed } from '@angular/core';
import { Notice, Staff, Student, Course, Batch } from '../models/models';

@Injectable({ providedIn: 'root' })
export class DataService {

  // ===========================
  // NOTICES
  // ===========================
  private _notices = signal<Notice[]>([
    {
      id: 'n1', title: 'Welcome to EmmetAcademy  Batch 2025!',
      content: 'We are excited to welcome all new students to the January 2025 batch. Orientation will be held on January 15th at 10 AM. Please bring all required documents and your enrollment receipt.',
      category: 'general', targetAudience: 'all', postedBy: 'Admin Kumar',
      isActive: true, isPinned: true,
      expiryDate: new Date('2025-02-01'), createdAt: new Date('2025-01-10'),
      updatedAt: new Date('2025-01-10')
    },
    {
      id: 'n2', title: 'React & Angular Module Exam Schedule',
      content: 'Exams for the React.js and Angular modules will be held on January 25th and 26th respectively. Students are advised to complete all assignments before the exam date. Revision sessions will be conducted on January 22nd and 23rd.',
      category: 'exam', targetAudience: 'students', postedBy: 'Priya Sharma',
      isActive: true, isPinned: false,
      expiryDate: new Date('2025-01-27'), createdAt: new Date('2025-01-12'),
      updatedAt: new Date('2025-01-12')
    },
    {
      id: 'n3', title: 'Republic Day Holiday — January 26th',
      content: 'The academy will remain closed on January 26th, 2025 on account of Republic Day. All scheduled classes and sessions will be rescheduled accordingly. Happy Republic Day!',
      category: 'holiday', targetAudience: 'staff', postedBy: 'Admin Kumar',
      isActive: true, isPinned: false,
      createdAt: new Date('2025-01-20'), updatedAt: new Date('2025-01-20')
    },
    {
      id: 'n4', title: 'Fee Submission Deadline — February 5th',
      content: 'All students are reminded to submit their second installment fees by February 5th, 2025. A late fee of ₹500 will be charged after the due date. Contact the accounts office for any queries.',
      category: 'fee', targetAudience: 'students', postedBy: 'Admin Kumar',
      isActive: true, isPinned: true,
      expiryDate: new Date('2025-02-10'), createdAt: new Date('2025-01-18'),
      updatedAt: new Date('2025-01-18')
    },
    {
      id: 'n5', title: 'Guest Lecture: Node.js Microservices',
      content: 'We are pleased to announce a guest lecture by Mr. Ankit Verma, Senior Backend Engineer at Flipkart. Topic: Building Scalable Microservices with Node.js. Date: February 2nd, 2025 at 2 PM. All students and staff are invited.',
      category: 'event', targetAudience: 'all', postedBy: 'Priya Sharma',
      isActive: true, isPinned: false,
      expiryDate: new Date('2025-02-03'), createdAt: new Date('2025-01-22'),
      updatedAt: new Date('2025-01-22')
    }
  ]);

  readonly notices = this._notices.asReadonly();
  readonly activeNotices = computed(() => this._notices().filter(n => n.isActive));
  readonly pinnedNotices = computed(() => this._notices().filter(n => n.isPinned && n.isActive));

  addNotice(notice: Omit<Notice, 'id' | 'createdAt' | 'updatedAt'>): Notice {
    const newNotice: Notice = { ...notice, id: this.genId('n'), createdAt: new Date(), updatedAt: new Date() };
    this._notices.update(list => [newNotice, ...list]);
    return newNotice;
  }

  updateNotice(id: string, updates: Partial<Notice>): void {
    this._notices.update(list =>
      list.map(n => n.id === id ? { ...n, ...updates, updatedAt: new Date() } : n)
    );
  }

  deleteNotice(id: string): void {
    this._notices.update(list => list.filter(n => n.id !== id));
  }

  getNoticeById(id: string): Notice | undefined {
    return this._notices().find(n => n.id === id);
  }

  // ===========================
  // STAFF
  // ===========================
  private _staff = signal<Staff[]>([
    {
      id: 's1', name: 'Priya Sharma', email: 'priya@emmetacademy.in', phone: '9876543210',
      role: 'instructor', department: 'frontend', qualification: 'B.Tech Computer Science',
      joiningDate: new Date('2023-06-01'), salary: 65000, isActive: true,
      subjects: ['HTML/CSS', 'JavaScript', 'React.js', 'Angular'], createdAt: new Date('2023-06-01')
    },
    {
      id: 's2', name: 'Rohit Desai', email: 'rohit@emmetacademy.in', phone: '9765432109',
      role: 'instructor', department: 'backend', qualification: 'MCA',
      joiningDate: new Date('2023-08-15'), salary: 70000, isActive: true,
      subjects: ['Node.js', 'Express.js', 'MongoDB', 'MySQL'], createdAt: new Date('2023-08-15')
    },
    {
      id: 's3', name: 'Sneha Kulkarni', email: 'sneha@emmetacademy.in', phone: '9654321098',
      role: 'coordinator', department: 'management', qualification: 'MBA',
      joiningDate: new Date('2023-09-01'), salary: 45000, isActive: true,
      subjects: [], createdAt: new Date('2023-09-01')
    },
    {
      id: 's4', name: 'Amit Joshi', email: 'amit@emmetacademy.in', phone: '9543210987',
      role: 'instructor', department: 'fullstack', qualification: 'B.E. Information Technology',
      joiningDate: new Date('2024-01-10'), salary: 72000, isActive: true,
      subjects: ['React.js', 'Node.js', 'TypeScript', 'Docker'], createdAt: new Date('2024-01-10')
    },
    {
      id: 's5', name: 'Meera Nair', email: 'meera@emmetacademy.in', phone: '9432109876',
      role: 'support', department: 'management', qualification: 'BCA',
      joiningDate: new Date('2024-03-05'), salary: 30000, isActive: false,
      subjects: [], createdAt: new Date('2024-03-05')
    }
  ]);

  readonly staff = this._staff.asReadonly();
  readonly activeStaff = computed(() => this._staff().filter(s => s.isActive));

  addStaff(staff: Omit<Staff, 'id' | 'createdAt'>): Staff {
    const newStaff: Staff = { ...staff, id: this.genId('st'), createdAt: new Date() };
    this._staff.update(list => [newStaff, ...list]);
    return newStaff;
  }

  updateStaff(id: string, updates: Partial<Staff>): void {
    this._staff.update(list => list.map(s => s.id === id ? { ...s, ...updates } : s));
  }

  deleteStaff(id: string): void {
    this._staff.update(list => list.filter(s => s.id !== id));
  }

  getStaffById(id: string): Staff | undefined {
    return this._staff().find(s => s.id === id);
  }

  // ===========================
  // STUDENTS
  // ===========================
  private _students = signal<Student[]>([
    // --- Original 6 ---
    {
      id: 'st1', name: 'Arjun Mehta', email: 'arjun@gmail.com', phone: '9321098765',
      course: 'Full Stack Development', batch: 'FS-Jan-2025',
      enrollmentDate: new Date('2025-01-05'), status: 'active',
      feePaid: true, totalFee: 45000, paidAmount: 45000,
      address: 'Pune, Maharashtra', createdAt: new Date('2025-01-05')
    },
    {
      id: 'st2', name: 'Kavya Reddy', email: 'kavya@gmail.com', phone: '9210987654',
      course: 'Frontend Development', batch: 'FE-Jan-2025',
      enrollmentDate: new Date('2025-01-06'), status: 'active',
      feePaid: false, totalFee: 28000, paidAmount: 14000,
      address: 'Nagpur, Maharashtra', createdAt: new Date('2025-01-06')
    },
    {
      id: 'st3', name: 'Suraj Pawar', email: 'suraj@gmail.com', phone: '9109876543',
      course: 'Backend Development', batch: 'BE-Dec-2024',
      enrollmentDate: new Date('2024-12-01'), status: 'completed',
      feePaid: true, totalFee: 32000, paidAmount: 32000,
      address: 'Mumbai, Maharashtra', createdAt: new Date('2024-12-01')
    },
    {
      id: 'st4', name: 'Anjali Singh', email: 'anjali@gmail.com', phone: '9098765432',
      course: 'Full Stack Development', batch: 'FS-Jan-2025',
      enrollmentDate: new Date('2025-01-08'), status: 'active',
      feePaid: true, totalFee: 45000, paidAmount: 22500,
      address: 'Nashik, Maharashtra', createdAt: new Date('2025-01-08')
    },
    {
      id: 'st5', name: 'Dev Kapoor', email: 'dev@gmail.com', phone: '8987654321',
      course: 'Frontend Development', batch: 'FE-Nov-2024',
      enrollmentDate: new Date('2024-11-15'), status: 'dropped',
      feePaid: false, totalFee: 28000, paidAmount: 10000,
      address: 'Aurangabad, Maharashtra', createdAt: new Date('2024-11-15')
    },
    {
      id: 'st6', name: 'Riya Ghosh', email: 'riya@gmail.com', phone: '8876543210',
      course: 'Full Stack Development', batch: 'FS-Feb-2025',
      enrollmentDate: new Date('2025-01-20'), status: 'pending',
      feePaid: false, totalFee: 45000, paidAmount: 0,
      address: 'Kolhapur, Maharashtra', createdAt: new Date('2025-01-20')
    },

    // --- 20 New Students ---
    {
      id: 'st7', name: 'Rohan Deshmukh', email: 'rohan.deshmukh@gmail.com', phone: '9312345678',
      course: 'Full Stack Development', batch: 'FS-Feb-2025',
      enrollmentDate: new Date('2025-02-01'), status: 'active',
      feePaid: true, totalFee: 45000, paidAmount: 45000,
      address: 'Pune, Maharashtra', createdAt: new Date('2025-02-01')
    },
    {
      id: 'st8', name: 'Sneha Kulkarni', email: 'sneha.kulkarni@gmail.com', phone: '9223456789',
      course: 'Frontend Development', batch: 'FE-Feb-2025',
      enrollmentDate: new Date('2025-02-03'), status: 'active',
      feePaid: false, totalFee: 28000, paidAmount: 14000,
      address: 'Pune, Maharashtra', createdAt: new Date('2025-02-03')
    },
    {
      id: 'st9', name: 'Karan Joshi', email: 'karan.joshi@gmail.com', phone: '9134567890',
      course: 'Backend Development', batch: 'BE-Jan-2025',
      enrollmentDate: new Date('2025-01-10'), status: 'active',
      feePaid: true, totalFee: 32000, paidAmount: 32000,
      address: 'Mumbai, Maharashtra', createdAt: new Date('2025-01-10')
    },
    {
      id: 'st10', name: 'Pooja Patil', email: 'pooja.patil@gmail.com', phone: '9045678901',
      course: 'Full Stack Development', batch: 'FS-Jan-2025',
      enrollmentDate: new Date('2025-01-12'), status: 'active',
      feePaid: false, totalFee: 45000, paidAmount: 22500,
      address: 'Solapur, Maharashtra', createdAt: new Date('2025-01-12')
    },
    {
      id: 'st11', name: 'Amit Sharma', email: 'amit.sharma@gmail.com', phone: '8956789012',
      course: 'Backend Development', batch: 'BE-Dec-2024',
      enrollmentDate: new Date('2024-12-10'), status: 'completed',
      feePaid: true, totalFee: 32000, paidAmount: 32000,
      address: 'Nagpur, Maharashtra', createdAt: new Date('2024-12-10')
    },
    {
      id: 'st12', name: 'Priya Nair', email: 'priya.nair@gmail.com', phone: '8867890123',
      course: 'Frontend Development', batch: 'FE-Jan-2025',
      enrollmentDate: new Date('2025-01-14'), status: 'active',
      feePaid: true, totalFee: 28000, paidAmount: 28000,
      address: 'Thane, Maharashtra', createdAt: new Date('2025-01-14')
    },
    {
      id: 'st13', name: 'Vishal More', email: 'vishal.more@gmail.com', phone: '9378901234',
      course: 'Full Stack Development', batch: 'FS-Feb-2025',
      enrollmentDate: new Date('2025-02-05'), status: 'active',
      feePaid: false, totalFee: 45000, paidAmount: 0,
      address: 'Nashik, Maharashtra', createdAt: new Date('2025-02-05')
    },
    {
      id: 'st14', name: 'Deepika Iyer', email: 'deepika.iyer@gmail.com', phone: '9289012345',
      course: 'Backend Development', batch: 'BE-Jan-2025',
      enrollmentDate: new Date('2025-01-18'), status: 'active',
      feePaid: false, totalFee: 32000, paidAmount: 16000,
      address: 'Aurangabad, Maharashtra', createdAt: new Date('2025-01-18')
    },
    {
      id: 'st15', name: 'Nikhil Bane', email: 'nikhil.bane@gmail.com', phone: '9190123456',
      course: 'Frontend Development', batch: 'FE-Nov-2024',
      enrollmentDate: new Date('2024-11-20'), status: 'dropped',
      feePaid: false, totalFee: 28000, paidAmount: 7000,
      address: 'Kolhapur, Maharashtra', createdAt: new Date('2024-11-20')
    },
    {
      id: 'st16', name: 'Sakshi Shinde', email: 'sakshi.shinde@gmail.com', phone: '9001234567',
      course: 'Full Stack Development', batch: 'FS-Jan-2025',
      enrollmentDate: new Date('2025-01-22'), status: 'pending',
      feePaid: false, totalFee: 45000, paidAmount: 0,
      address: 'Pune, Maharashtra', createdAt: new Date('2025-01-22')
    },
    {
      id: 'st17', name: 'Rahul Wagh', email: 'rahul.wagh@gmail.com', phone: '8912345670',
      course: 'Backend Development', batch: 'BE-Feb-2025',
      enrollmentDate: new Date('2025-02-08'), status: 'active',
      feePaid: true, totalFee: 32000, paidAmount: 32000,
      address: 'Mumbai, Maharashtra', createdAt: new Date('2025-02-08')
    },
    {
      id: 'st18', name: 'Ananya Bhosale', email: 'ananya.bhosale@gmail.com', phone: '8823456701',
      course: 'Frontend Development', batch: 'FE-Feb-2025',
      enrollmentDate: new Date('2025-02-10'), status: 'active',
      feePaid: true, totalFee: 28000, paidAmount: 28000,
      address: 'Nagpur, Maharashtra', createdAt: new Date('2025-02-10')
    },
    {
      id: 'st19', name: 'Siddharth Rane', email: 'siddharth.rane@gmail.com', phone: '9734567012',
      course: 'Full Stack Development', batch: 'FS-Mar-2025',
      enrollmentDate: new Date('2025-03-01'), status: 'pending',
      feePaid: false, totalFee: 45000, paidAmount: 0,
      address: 'Nashik, Maharashtra', createdAt: new Date('2025-03-01')
    },
    {
      id: 'st20', name: 'Meera Pillai', email: 'meera.pillai@gmail.com', phone: '9645670123',
      course: 'Backend Development', batch: 'BE-Feb-2025',
      enrollmentDate: new Date('2025-02-12'), status: 'active',
      feePaid: false, totalFee: 32000, paidAmount: 8000,
      address: 'Thane, Maharashtra', createdAt: new Date('2025-02-12')
    },
    {
      id: 'st21', name: 'Aakash Tiwari', email: 'aakash.tiwari@gmail.com', phone: '9556701234',
      course: 'Frontend Development', batch: 'FE-Dec-2024',
      enrollmentDate: new Date('2024-12-05'), status: 'completed',
      feePaid: true, totalFee: 28000, paidAmount: 28000,
      address: 'Solapur, Maharashtra', createdAt: new Date('2024-12-05')
    },
    {
      id: 'st22', name: 'Neha Jadhav', email: 'neha.jadhav@gmail.com', phone: '9467012345',
      course: 'Full Stack Development', batch: 'FS-Feb-2025',
      enrollmentDate: new Date('2025-02-15'), status: 'active',
      feePaid: true, totalFee: 45000, paidAmount: 45000,
      address: 'Pune, Maharashtra', createdAt: new Date('2025-02-15')
    },
    {
      id: 'st23', name: 'Omkar Sawant', email: 'omkar.sawant@gmail.com', phone: '9378123456',
      course: 'Backend Development', batch: 'BE-Jan-2025',
      enrollmentDate: new Date('2025-01-25'), status: 'active',
      feePaid: false, totalFee: 32000, paidAmount: 16000,
      address: 'Kolhapur, Maharashtra', createdAt: new Date('2025-01-25')
    },
    {
      id: 'st24', name: 'Tanvi Deshpande', email: 'tanvi.deshpande@gmail.com', phone: '9289234567',
      course: 'Frontend Development', batch: 'FE-Feb-2025',
      enrollmentDate: new Date('2025-02-18'), status: 'active',
      feePaid: false, totalFee: 28000, paidAmount: 14000,
      address: 'Aurangabad, Maharashtra', createdAt: new Date('2025-02-18')
    },
    {
      id: 'st25', name: 'Yash Kadam', email: 'yash.kadam@gmail.com', phone: '9190345678',
      course: 'Full Stack Development', batch: 'FS-Mar-2025',
      enrollmentDate: new Date('2025-03-05'), status: 'pending',
      feePaid: false, totalFee: 45000, paidAmount: 22500,
      address: 'Mumbai, Maharashtra', createdAt: new Date('2025-03-05')
    },
    {
      id: 'st26', name: 'Ishaan Chavan', email: 'ishaan.chavan@gmail.com', phone: '9001456789',
      course: 'Backend Development', batch: 'BE-Mar-2025',
      enrollmentDate: new Date('2025-03-08'), status: 'active',
      feePaid: true, totalFee: 32000, paidAmount: 32000,
      address: 'Pune, Maharashtra', createdAt: new Date('2025-03-08')
    }
  ]);

  readonly students = this._students.asReadonly();

  addStudent(student: Omit<Student, 'id' | 'createdAt'>,): Student {
    const course = this._courses().find(c => c.title === student.course);
    if (course) {
      course.enrolledCount += 1;
    }
    console.log('Adding student:', student, 'Course found:', course);
    const newStudent: Student = { ...student, id: this.genId('stu'), createdAt: new Date() };
    this._students.update(list => [newStudent, ...list]);
    return newStudent;
  }

  updateStudent(id: string, updates: Partial<Student>): void {
    this._students.update(list => list.map(s => s.id === id ? { ...s, ...updates } : s));
  }

  deleteStudent(id: string): void {
    this._students.update(list => list.filter(s => s.id !== id));
  }

  getStudentById(id: string): Student | undefined {
    return this._students().find(s => s.id === id);
  }

  // ===========================
  // COURSES
  // ===========================
  private _courses = signal<Course[]>([
    {
      id: 'c1', title: 'Full Stack Web Development', code: 'FS-001',
      category: 'fullstack', description: 'Complete MERN stack development from scratch to deployment. Covers HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB.',
      duration: '4 months', fee: 45000, instructor: 'Amit Joshi',
      enrolledCount: 24, maxCapacity: 30, status: 'active',
      topics: ['HTML/CSS', 'JavaScript ES6+', 'React.js', 'Node.js', 'MongoDB', 'Git', 'Docker'],
      startDate: new Date('2025-01-15'), createdAt: new Date('2024-12-01')
    },
    {
      id: 'c2', title: 'Frontend Development', code: 'FE-001',
      category: 'frontend', description: 'Master modern frontend development with React and Angular. Learn state management, performance optimization, and UI/UX principles.',
      duration: '3 months', fee: 28000, instructor: 'Priya Sharma',
      enrolledCount: 18, maxCapacity: 25, status: 'active',
      topics: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Angular', 'TypeScript'],
      startDate: new Date('2025-01-10'), createdAt: new Date('2024-12-01')
    },
    {
      id: 'c3', title: 'Backend Development with Node.js', code: 'BE-001',
      category: 'backend', description: 'Build robust server-side applications using Node.js, Express, and databases. REST APIs, authentication, and microservices architecture.',
      duration: '3 months', fee: 32000, instructor: 'Rohit Desai',
      enrolledCount: 15, maxCapacity: 20, status: 'active',
      topics: ['Node.js', 'Express.js', 'REST APIs', 'MySQL', 'MongoDB', 'JWT'],
      startDate: new Date('2025-01-12'), createdAt: new Date('2024-12-01')
    },
    {
      id: 'c4', title: 'DevOps & Cloud Basics', code: 'DO-001',
      category: 'devops', description: 'Introduction to DevOps practices, CI/CD pipelines, Docker containers, and AWS cloud services.',
      duration: '2 months', fee: 22000, instructor: 'Amit Joshi',
      enrolledCount: 0, maxCapacity: 20, status: 'upcoming',
      topics: ['Linux', 'Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Nginx'],
      startDate: new Date('2025-03-01'), createdAt: new Date('2025-01-15')
    }
  ]);

  readonly courses = this._courses.asReadonly();
  getcatories() {
    const cats = new Set(this._courses().map(c => c.category));
    console.log('Course categories:', cats);
    return Array.from(cats);
  }
  getCouseStatus() {
    const status = new Set(this._courses().map(c => c.status));
    console.log('Course categories:', status);
    return Array.from(status);
  }

  getAllDepartments() {
    const depts = new Set(this._staff().map(s => s.department));
    console.log('Staff departments:', depts);
    return Array.from(depts);
  }

  getAllStaffRoles() {
    const roles = new Set(this._staff().map(s => s.role));
    console.log('Staff roles:', roles);
    return Array.from(roles);
  }

  addCourse(course: Omit<Course, 'id' | 'createdAt'>): Course {
    const newCourse: Course = { ...course, id: this.genId('c'), createdAt: new Date() };
    this._courses.update(list => [newCourse, ...list]);
    return newCourse;
  }

  updateCourse(id: string, updates: Partial<Course>): void {
    this._courses.update(list => list.map(c => c.id === id ? { ...c, ...updates } : c));
  }

  deleteCourse(id: string): void {
    this._courses.update(list => list.filter(c => c.id !== id));
  }

  // ===========================
  // BATCHES
  // ===========================
  private _batches = signal<Batch[]>([
    {
      id: 'b1', name: 'FS-Jan-2025', courseId: 'c1', courseName: 'Full Stack Development',
      startDate: new Date('2025-01-15'), endDate: new Date('2025-05-15'),
      timing: '10:00 AM – 1:00 PM', instructor: 'Amit Joshi',
      room: 'Lab 1', capacity: 30, enrolled: 24, status: 'ongoing', createdAt: new Date('2025-01-01')
    },
    {
      id: 'b2', name: 'FE-Jan-2025', courseId: 'c2', courseName: 'Frontend Development',
      startDate: new Date('2025-01-10'), endDate: new Date('2025-04-10'),
      timing: '2:00 PM – 5:00 PM', instructor: 'Priya Sharma',
      room: 'Lab 2', capacity: 25, enrolled: 18, status: 'ongoing', createdAt: new Date('2025-01-01')
    },
    {
      id: 'b3', name: 'FS-Feb-2025', courseId: 'c1', courseName: 'Full Stack Development',
      startDate: new Date('2025-02-10'), endDate: new Date('2025-06-10'),
      timing: '6:00 PM – 9:00 PM', instructor: 'Amit Joshi',
      room: 'Lab 1', capacity: 30, enrolled: 5, status: 'upcoming', createdAt: new Date('2025-01-20')
    }
  ]);

  readonly batches = this._batches.asReadonly();

  addBatch(batch: Omit<Batch, 'id' | 'createdAt'>): Batch {
    const newBatch: Batch = { ...batch, id: this.genId('b'), createdAt: new Date() };
    this._batches.update(list => [newBatch, ...list]);
    return newBatch;
  }

  updateBatch(id: string, updates: Partial<Batch>): void {
    this._batches.update(list => list.map(b => b.id === id ? { ...b, ...updates } : b));
  }

  deleteBatch(id: string): void {
    this._batches.update(list => list.filter(b => b.id !== id));
  }

  // Dashboard stats
  getDashboardStats() {
    const students = this._students();
    const staff = this._staff();
    const courses = this._courses();
    const notices = this._notices();
    return {
      totalStudents: students.length,
      activeStudents: students.filter(s => s.status === 'active').length,
      totalStaff: staff.filter(s => s.isActive).length,
      totalCourses: courses.filter(c => c.status === 'active').length,
      activeNotices: notices.filter(n => n.isActive).length,
      totalRevenue: students.reduce((sum, s) => sum + s.paidAmount, 0),
      pendingFees: students.reduce((sum, s) => sum + (s.totalFee - s.paidAmount), 0),
      ongoingBatches: this._batches().filter(b => b.status === 'ongoing').length,
    };
  }

  private genId(prefix: string): string {
    return `${prefix}${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  }
}
