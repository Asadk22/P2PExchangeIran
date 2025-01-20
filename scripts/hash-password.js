const bcrypt = require('bcryptjs');

async function hashPassword() {
  const password = 'test123';
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);
  console.log('Password:', password);
  console.log('Hash:', hash);
  
  // Verify the hash
  const isValid = await bcrypt.compare(password, hash);
  console.log('Hash verification:', isValid);
}

hashPassword();
