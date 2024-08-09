function Validation(values) {
    let errors = {};

    // Regular expressions for validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const phonePattern = /^[0-9]{10}$/; // Example pattern for 10-digit phone numbers

    // Check for empty username
    if (!values.username.trim()) {
        errors.username = "กรุณากรอก Username";
    }

    // Check for email and format
    if (!values.email.trim()) {
        errors.email = "กรุณากรอก email";
    } else if (!emailPattern.test(values.email)) {
        errors.email = "รูปแบบ email ไม่ถูกต้อง";
    }

    // Check for password and format
    if (!values.password.trim()) {
        errors.password = "กรุณากรอก Password";
    } else if (!passwordPattern.test(values.password)) {
        errors.password = "Password ต้องมีอย่างน้อย 8 ตัวอักษรและรวมตัวเลข";
    }

    // Check for firstname_lastname
    if (!values.firstname_lastname.trim()) {
        errors.firstname_lastname = "กรุณากรอกชื่อผู้ลงทะเบียน";
    }

    // Check for phone_number
    if (!values.phone_number.trim()) {
        errors.phone_number = "กรุณากรอกเบอร์โทรศัพท์";
    } else if (!phonePattern.test(values.phone_number)) {
        errors.phone_number = "รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง";
    }

    // Check for affiliation
    if (!values.affiliation.trim()) {
        errors.affiliation = "กรุณากรอกสังกัด/หน่วยงาน";
    }

    return errors;
}

export default Validation;
