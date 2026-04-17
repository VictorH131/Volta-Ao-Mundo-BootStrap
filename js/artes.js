 const modal = new bootstrap.Modal(document.getElementById('artModal'));

        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', () => {

                const img = card.querySelector('img').src;
                const title = card.querySelector('h5')?.innerText || '';
                const sub = card.querySelector('small')?.innerText || '';

                document.getElementById('modalImg').src = img;
                document.getElementById('modalTitle').innerText = title;
                document.getElementById('modalSub').innerText = sub;

                modal.show();
            });
        });