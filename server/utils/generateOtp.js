/**
 * 
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
function getOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

export default getOTP;
  