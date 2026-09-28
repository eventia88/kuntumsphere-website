# Kuntum Sphere

Laman statik Kuntum Sphere untuk GitHub Pages. Tiada sistem pembayaran atau borang yang menyimpan data pelanggan. Butang pertanyaan membuka WhatsApp atau aplikasi e-mel pengunjung.

## Terbitkan

1. Muat naik fail dalam folder ini ke akar repositori GitHub awam.
2. Dalam **Settings → Pages**, pilih **Deploy from a branch**, `main`, `/ (root)`.
3. Dalam **Custom domain**, masukkan `www.kuntumsphere.com` dan simpan. Fail `CNAME` dalam projek ini menyimpan nama itu.
4. Di DNS domain, tetapkan CNAME `www` kepada `<nama-pengguna>.github.io` mengikut nama akaun GitHub sebenar. Jangan teka nilainya sebelum repositori dipilih.
5. Selepas DNS disahkan, hidupkan **Enforce HTTPS**. Untuk versi tanpa `www`, ikut rekod A atau ALIAS yang dipaparkan oleh panduan GitHub.

Kandungan laman boleh dikemas kini dalam `index.html`; warna dan susun atur dalam `styles.css`.
