interface BankAccountValidation {
  isValid: boolean
  errors: string[]
}

interface CardValidation {
  isValid: boolean
  errors: string[]
  cardType?: string
  issuer?: string
}

// IBAN validation for different countries
const ibanPatterns = {
  DE: /^DE\d{2}[0-9]{16,18}$/, // German IBAN - more flexible length
  GB: /^GB\d{2}[A-Z]{4}\d{14}$/, // UK IBAN
  IR: /^IR\d{2}[0-9]{22}$/, // Iranian IBAN
}

// Function to calculate IBAN checksum
function isValidIBANChecksum(iban: string): boolean {
  // Remove spaces and convert to uppercase
  iban = iban.replace(/\s/g, '').toUpperCase();
  
  // Move first 4 chars to end and convert letters to numbers
  const rearranged = iban.slice(4) + iban.slice(0, 4);
  let converted = '';
  
  for (let i = 0; i < rearranged.length; i++) {
    const char = rearranged[i];
    // Convert letters to numbers (A=10, B=11, etc.)
    if (/[A-Z]/.test(char)) {
      converted += (char.charCodeAt(0) - 55).toString();
    } else {
      converted += char;
    }
  }
  
  // Convert to number and check if divisible by 97
  let remainder = 0;
  for (let i = 0; i < converted.length; i++) {
    remainder = (remainder * 10 + parseInt(converted[i])) % 97;
  }
  
  return remainder === 1;
}

// Card number patterns for different issuers
const cardPatterns = {
  visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
  mastercard: /^5[1-5][0-9]{14}$/,
  amex: /^3[47][0-9]{13}$/,
}

// Name validation patterns
const namePatterns = {
  latin: /^[A-Za-z\s\-']+$/,
  persian: /^[\u0600-\u06FF\s]+$/, // Persian/Arabic characters
}

export function validateIBAN(iban: string, countryCode: string): boolean {
  // Remove spaces and convert to uppercase
  iban = iban.replace(/\s/g, '').toUpperCase();
  
  // Check country-specific pattern
  const pattern = ibanPatterns[countryCode];
  if (!pattern) return true; // Skip validation if pattern not found
  
  // First check basic pattern
  if (!pattern.test(iban)) {
    return false;
  }
  
  // Then check IBAN checksum
  return isValidIBANChecksum(iban);
}

export function validateCardNumber(cardNumber: string): CardValidation {
  // Remove spaces and dashes
  cardNumber = cardNumber.replace(/[\s-]/g, '')
  
  const validation: CardValidation = {
    isValid: false,
    errors: [],
  }

  // Luhn algorithm for card number validation
  let sum = 0
  let isEven = false
  
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i])
    
    if (isEven) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }
    
    sum += digit
    isEven = !isEven
  }

  if (sum % 10 !== 0) {
    validation.errors.push('Invalid card number')
    return validation
  }

  // Determine card issuer
  if (cardPatterns.visa.test(cardNumber)) {
    validation.cardType = 'Visa'
    validation.issuer = 'Visa'
  } else if (cardPatterns.mastercard.test(cardNumber)) {
    validation.cardType = 'Mastercard'
    validation.issuer = 'Mastercard'
  } else if (cardPatterns.amex.test(cardNumber)) {
    validation.cardType = 'American Express'
    validation.issuer = 'American Express'
  }

  validation.isValid = true
  return validation
}

export function validateAccountHolder(name: string, countryCode: string): boolean {
  // Remove extra spaces
  name = name.trim().replace(/\s+/g, ' ')
  
  // Use appropriate pattern based on country
  if (countryCode === 'IR') {
    return namePatterns.persian.test(name)
  } else {
    return namePatterns.latin.test(name)
  }
}

export function validateBankAccount(
  accountData: {
    accountHolder: string
    accountNumber: string
    bankName: string
    country: string
    cardNumber?: string
  }
): BankAccountValidation {
  const validation: BankAccountValidation = {
    isValid: true,
    errors: [],
  }

  // Validate account holder name
  if (!validateAccountHolder(accountData.accountHolder, accountData.country)) {
    validation.errors.push(
      accountData.country === 'IR' 
        ? 'Account holder name must be in Persian characters'
        : 'Account holder name must contain only Latin characters'
    )
  }

  // Validate IBAN/account number
  if (!validateIBAN(accountData.accountNumber, accountData.country)) {
    validation.errors.push('Invalid IBAN format for selected country')
  }

  // Card validation if provided
  if (accountData.cardNumber) {
    const cardValidation = validateCardNumber(accountData.cardNumber)
    if (!cardValidation.isValid) {
      validation.errors.push(...cardValidation.errors)
    }
  }

  validation.isValid = validation.errors.length === 0
  return validation
}
