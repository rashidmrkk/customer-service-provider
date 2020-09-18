
const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) return true;
    else return false;
  };

  const isEmpty = (string) => {
    if (string.trim() === '') return true;
    else return false;
  };

exports.validateSignupData = (data) => {
    let errors = {};
    if (isEmpty(data.email)) {
      errors.email = 'Must not be empty';
    } else if (!isEmail(data.email)) {
      errors.email = 'Must be a valid email address';
    }
    
    if (isEmpty(data.password)) errors.password = 'Must not be empty';
    if (data.password !== data.confirmPassword)
      errors.confirmPassword = 'Passwords must match';
    if (isEmpty(data.mobileNumber)){ 
      errors.mobileNumber = 'Must not be empty';
    }
    if (isEmpty(data.fullName)) errors.fullName = 'Must not be empty';
    console.log({errors:errors})
  
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    };
  };
  
  exports.validateLoginData = (data) => {
    let errors = {};
    if (isEmpty(data.email)) {
      errors.email = 'Must not be empty';
    } else if (!isEmail(data.email)) {
      errors.email = 'Must be a valid email address';
    }
    if (isEmpty(data.password)) errors.password = 'Must not be empty';
  
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    };
  };

  exports.validateAddress = (data) => {
    let errors = {};
    if (isEmpty(data.line1)) {
      errors.line1 = 'Must not be empty';
    } 
    
    if (isEmpty(data.line2)) errors.line2 = 'Must not be empty';
    if (isEmpty(data.country)){ 
      errors.country = 'Must not be empty';
    }
    if (isEmpty(data.state)) errors.state = 'Must not be empty';
    if (isEmpty(data.pincode)) errors.pincode = 'Must not be empty';
    console.log({errors:errors})
  
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    };
  };
  exports.validateFamilyMember = (data) => {
    let errors = {};
    if (isEmpty(data.name)) {
      errors.name = 'Must not be empty';
    } 
    
    if (isEmpty(data.dob)) errors.dob = 'Must not be empty';
    if (isEmpty(data.sex)){ 
      errors.sex = 'Must not be empty';
    }
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    };
  };
  
