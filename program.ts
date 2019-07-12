import StatUp from './startup';

let port = process.env.PORT || '3050';

StatUp.app.listen(port, () => {
    console.log(`servidor startando na porta ${port}`);
})