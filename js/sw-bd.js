const db = new PouchDB('resultados');

const guardarResultado = (nota) => {
    nota._id = new Date().toISOString();
    return db.put(nota).then(() => {
        self.registration.sync.register('nuevo-resultado');
        const newResp = { ok: true, offline: true };
        return new Response(JSON.stringify(newResp));
    }).catch(err => {
        console.error('Error al guardar en IndexedDB:', err);
        return new Response(JSON.stringify({ ok: false, error: err.message }));
    });
};


const postearResultados = () => {
    const notasPost = [];
    return db.allDocs({ include_docs: true }).then(docs => {
        docs.rows.forEach(row => {
            const doc = row.doc;
            console.log(doc)
            const data = {
                idUsuario: doc.idUsuario,
                idTrivia: doc.idTrivia,
                puntaje: doc.puntaje,
            };

            const fetchProm = fetch('https://trivias-api.vercel.app/api/resultados', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)


            }).then(resp => {
                console.log('Conexion recuperada enviando depositos a servidor... ', resp.json())
                //eliminar las notas de index db
                return db.remove(doc);
            });
            notasPost.push(fetchProm);
        });
        return Promise.all(notasPost);
    });
};
