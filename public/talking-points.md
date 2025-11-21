Friday, 21 November 2025

Purwadhika FSWD Talking Notes

## Introduction

Assalamu'alaikum dan selamat sore. Nama saya Griko, saya akan menjadi mentor kelas full-stack web development hari ini. Mari kita melanjutkan ke bagian selanjutnya yaitu State Management.

## State Management Overview

Saat kita berurusan dengan project React, kita pasti akan berurusan dengan state management atau cara menyimpan data di browser. Dalam konteks ini, bagaimana cara kita menyimpan state atau data pada komponen-komponen React.

(Berikan contoh seperti tombol tema website atau indikator typing di WhatsApp.)

## Local State vs Global State

Dari contoh-contoh tersebut, kita bisa membedakan state menjadi dua kondisi, yaitu local state dan global state.

**Local State**: Paling sederhana adalah satu komponen memiliki kondisi sendiri. Di dalamnya ada state-nya—apakah sedang aktif, tidak aktif, kondisi A, B, atau C—dan state tersebut tidak bisa di-share ke komponen lain.

(Berikan penjelasan tentang konsep prop drilling.)

**Global State**: Karena itu ada konsep global state di mana kita menyimpan kondisi atau state secara global. Jika kemudian komponen A, B, C membutuhkan, tinggal ambil dari global state yang kita definisikan tadi.

Contoh: tombol tema pada website. State-nya tidak perlu disimpan di setiap komponen sendiri-sendiri, jadi tinggal baca dari global state.

## Browser Storage APIs

State yang kita simpan di React disimpan pada runtime atau saat browser sedang berjalan. Jadi saat kita refresh, state-nya pasti hilang karena semua ada di memory.

### localStorage

Salah satu solusi untuk menyimpan state agar tetap ada setelah refresh adalah menggunakan API browser bernama `localStorage`.

(Berikan penjelasan tentang localStorage sedetail mungkin.)

Dengan localStorage, kita bisa menyimpan kondisi state dan pada saat website di-refresh atau dibuka ulang, React dapat mengambil state yang sudah disimpan.

(Berikan contoh tombol tema website dengan localStorage.)

**API localStorage** yang sering dipakai:
- `setItem`: menyimpan value
- `getItem`: mengambil value
- `removeItem`: menghapus value tertentu
- `clear`: menghapus semua value localStorage

### sessionStorage

Ada API lain selain localStorage yaitu `sessionStorage`, yang hanya menyimpan data sementara. Seberapa lama? Hanya saat tab dibuka. Saat browser ditutup dan dibuka lagi, datanya sudah tidak tersimpan.

### localStorage vs sessionStorage vs Cookies

localStorage dan sessionStorage hanya menyimpan data di browser secara client-side. Jadi server yang menyajikan website tidak bisa membaca localStorage atau sessionStorage, kecuali jika menggunakan script dan mengirim datanya ke server.

### Cookies

Bagaimana caranya agar server bisa membaca state yang dibutuhkan tanpa localStorage atau sessionStorage? Alternatifnya adalah menggunakan **cookies**.

Cookies lebih permanen dibanding localStorage dan sessionStorage karena cookies harus didefinisikan untuk:
- Domain apa yang boleh mengakses
- Berapa lama mau disimpan
- Halaman-halaman tertentu yang boleh mengakses cookies

(Berikan contoh tombol tema website dengan cookies.)

(Berikan penjelasan tabel perbandingan kapasitas dan pro-kontra dari localStorage, sessionStorage, dan cookies.)

## React Context API

Konsep ketiga API tadi (localStorage, sessionStorage, cookies) lebih ke fundamental web pada umumnya, bukan spesifik React.

Untuk kembali ke React, bagaimana cara menyimpan data secara global? Ada satu API dari React namanya **Context** dengan hooks `useContext`.

Contoh: kita definisikan tema gelap atau terang, simpan di satu context untuk menyimpan state-nya, dan komponen-komponen yang akan kita pakai tinggal mengakses context tersebut untuk mengetahui temanya gelap atau terang.

Jadi komponen di bawah tidak perlu tracking state-nya sendiri-sendiri. Sesuai dengan use case ini, kita baca state-nya dari context atau dari global.

(Berikan penjelasan penggunaan context sesuai slide. Mulai dari definisi context, cara wrap aplikasi dengan komponen context, dan cara penggunaan useContext.)

### Limitasi Context

Penggunaan context terlihat simpel, tapi sayangnya ada beberapa kendala kalau kita pakai context.

(Berikan penjelasan tentang constant re-rendering karena di-wrap dengan context.)

Sebenarnya tidak masalah wrap aplikasi dengan context, cuma ada beberapa kondisi kalau state-nya berubah terus, komponen yang di-wrap dengan context akan re-render terus dan bisa memberatkan performa aplikasi.

## External State Management: Zustand

Salah satu alternatif yang paling mudah adalah menggunakan state management di luar React, yaitu library bernama **Zustand**.

Zustand menggunakan konsep global state, bedanya tidak perlu repot menggunakan context. Semua state yang disimpan oleh Zustand di-manage oleh Zustand sendiri, tapi state-nya bisa dipakai di lingkungan React.

(Berikan penjelasan tentang Zustand sesuai dengan slide.)

(Berikan penjelasan tentang optimasi Zustand dengan selector.)

### Zustand & Next.js: Hydration Issues

Ada beberapa hal yang perlu diketahui tentang konsep state management, terutama dengan banyaknya full-stack framework seperti Next.js.

Website yang di-generate oleh Next.js sifatnya statis, tidak dinamis seperti JavaScript. Saat pertama load, datanya mungkin A, tapi karena ada perubahan di state management, bisa saja datanya berubah jadi B atau C. Ini ada istilah **hydration issues** di mana konten HTML statis-nya A, tapi saat React mulai hydrate atau load di browser, sebenarnya bukan A tapi B. Ini disebut **hydration mismatch**.

Contoh: kalau kita pakai `useAuthStore`, token-nya bisa berubah atau mungkin tidak ada, jadi akan muncul warning bahwa konten tidak sesuai dengan data yang diharapkan sebelumnya.

Solusinya: di Next.js, terutama versi-versi baru, komponen harus ditambahkan pragma `'use client'` di atas, supaya Next.js tahu bahwa komponen ini harus dirender client-side, tidak perlu static render.

(Kalau ingin tahu Next.js lebih lanjut, nanti kita bisa bahas di lain waktu. Untuk sekarang kita lanjut ke slide selanjutnya.)

## Redux

Zustand sebenarnya termasuk baru dan merupakan alternatif dari library yang sudah lama ada, namanya **Redux**.

Redux adalah benar-benar global state management dengan beberapa pattern yang didefinisikan untuk mempermudah tracking: siapa yang mengubah state, di mana mengubah state, dan bagaimana cara mengubah state.

Redux lebih berguna kalau aplikasinya kompleks, seperti skala e-commerce besar atau beberapa pattern yang lumayan kompleks dan perlu didefinisikan secara detail.

Tapi tidak semua website harus pakai Redux. Contoh: kalau state-nya simpel seperti Zustand tadi, tidak masalah kita pakai Zustand. Tapi kalau mulai skala yang agak besar dan harus buat 2-3 state management Zustand dan pengelolaannya jadi rumit, Redux bisa jadi pilihan yang lebih baik.

### Redux Ecosystem

Ecosystem Redux sangat luas dengan banyak library tambahan:
- **Redux** (core library)
- **Redux Toolkit** (official toolset untuk development efisien)
- **Redux DevTools Extension** (untuk debugging)
- **React-Redux** (integration package untuk React)

Fun fact: Redux tidak terkait langsung dengan React. Package **React-Redux** adalah package tambahan agar bisa pakai Redux di ekosistem React.

Fun fact lagi: **Zustand** ada karena kompleksnya Redux, jadi Zustand adalah versi alternatif yang lebih ringkas. Tidak selengkap Redux, tapi cukup untuk memulai dengan pola yang sama.

### Redux Data Flow

Data flow atau alur data di Redux menggunakan konsep **State**, **View**, dan **Actions**.

Perubahan state terjadi melalui action, dan state tersebut digunakan di view atau komponen-komponen lainnya. Sebagai referensi saat kita ingin mengubah state, biasanya melalui actions. Siklus ini sering disebut dengan **Flux Pattern**, dan Zustand juga memiliki konsep yang sama.

(Berikan penjelasan tentang Global Store, Actions, Dispatch, dan Reducer.)

### Redux Core Concepts

Untuk memahami konsep Redux, kita harus membuat satu **Store** di mana:
1. Kita buat **action** yang menjelaskan apa yang terjadi
2. Action tersebut akan di-**dispatch** atau dikirim ke Store
3. Dari action tersebut, kita harus membuat **reducer**
4. Reducer adalah function yang menentukan action apa yang diterima dan bagaimana cara mengubah state
5. State yang berubah tadi akan disimpan kembali ke Global Store

**Contoh**: kita menyimpan state counter dengan dua action untuk increment dan decrement. Jadi kita harus buat reducer di mana state-nya apa, action yang diterima apa, dan apa yang harus dilakukan dari action-action tersebut.

(Berikan penjelasan reducer sesuai dengan slide.)

### Redux Toolkit

Kalau dilihat contoh tadi, itu purely Redux belum menyentuh React dan cara pakainya. Sekarang kita lihat **Redux Toolkit** yang akan mempermudah penggunaan Redux di React.

Konsepnya sama seperti context, kita harus wrap aplikasi dengan provider dan ada parameter tambahannya di mana kita harus kasih store yang sudah kita define sebelumnya. Mirip seperti Zustand.

Perbedaannya: kita bisa lihat cara mendefinisikan initial state dan cara membuat reducer, yaitu membuat object properties dengan state yang diterima dan apa yang harus dilakukan.

(Berikan penjelasan sesuai dengan slide.)

## Summary & Exercise

Berikut rangkuman State Management mulai dari Context, Zustand, sampai Redux.

### Latihan Sesi Ini

Ada tiga hal untuk latihan:

1. **To-Do List App**: Buat aplikasi to-do list
2. **Sign In Page**: Buat sign-in page untuk login melihat to-do list. Input data dari login disimpan di global store Redux. (Catatan: ini tidak secure sama sekali, hanya untuk latihan konsep state management agar kita bisa tahu state disimpan seperti apa)
3. **Navbar Display**: Akses state email dari Redux dan tampilkan di kanan atas sebagai navbar. Jadi kalau lihat website pada umumnya, ada navbar/toolbar yang menampilkan info user dari sign-in page tadi.

---

## Notes for Presenter
- Adjust pacing based on audience understanding
- Use live coding examples when possible
- Reference the demo app for practical examples
- Encourage questions throughout the session
