const forgotPassword = (name, token) => {
  return (
    `<h3>Olá ${name} !` +
    `<br/>` +
    ` <p> Vimos que você esqueceu sue senha, utilize o token: ${token} para resetar a senha </p> ` +
    `<br/>` +
    `<strong>Equipe SSVP Digital</strong>`
  );
};

module.exports = { forgotPassword };
