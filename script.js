const envelope = document.getElementById("envelope");
const opening = document.getElementById("opening");

const cinematic = document.getElementById("cinematic");
const scrapbook = document.getElementById("scrapbook");

const heartPlay = document.getElementById("heartPlay");
const heartAnimation = document.getElementById("heartAnimation");
const finalWords = document.getElementById("finalWords");

const photos = document.querySelectorAll(".interactive-photo");

const photoViewer = document.getElementById("photoViewer");
const viewerImage = document.getElementById("viewerImage");
const closePhoto = document.getElementById("closePhoto");


/* 2. ENVELOPE OPENING */

let opened = false;

if (envelope) {

    envelope.addEventListener("click", () => {

        if (opened) return;

        opened = true;

        /* buka amplop */
        envelope.classList.add("open");


        /* tunggu animasi amplop */
        setTimeout(() => {

            /* hilangkan opening */
            if (opening) {
                opening.classList.add("hide");
            }

            /* tampilkan cinematic */
            if (cinematic) {

                cinematic.classList.add("active");

                setTimeout(() => {

                    cinematic.classList.add("reveal");

                }, 300);
            }


            /* setelah cinematic selesai */
            setTimeout(() => {

                if (cinematic) {
                    cinematic.classList.remove("active");
                }

                /* tampilkan scrapbook */
                if (scrapbook) {

                    scrapbook.classList.add("visible");

                }

                /* aktifkan scroll */
                document.body.style.overflow = "auto";

                /* cek reveal pertama */
                revealOnScroll();

            }, 4300);

        }, 1800);

    });

}


/* 3. SCROLL REVEAL */

const revealElements =
    document.querySelectorAll(".reveal");


function revealOnScroll() {

    const windowHeight =
        window.innerHeight;


    revealElements.forEach((element) => {

        const elementTop =
            element.getBoundingClientRect().top;


        const revealPoint =
            windowHeight - 100;


        if (elementTop < revealPoint) {

            element.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    revealOnScroll
);


/* 4. PHOTO VIEWER */

if (
    photos.length > 0 &&
    photoViewer &&
    viewerImage
) {

    photos.forEach((photo) => {

        photo.addEventListener("click", () => {

            const image =
                photo.querySelector("img");

            if (!image) return;


            viewerImage.src =
                image.src;


            photoViewer.classList.add("active");

        });

    });

}


/* close photo */

if (closePhoto && photoViewer) {

    closePhoto.addEventListener(
        "click",
        () => {

            photoViewer.classList.remove(
                "active"
            );

        }
    );

}


/* klik area luar foto */

if (photoViewer) {

    photoViewer.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                photoViewer
            ) {

                photoViewer.classList.remove(
                    "active"
                );

            }

        }
    );

}


/* 5. HEART EXPLOSION */

if (
    heartPlay &&
    heartAnimation
) {

    heartPlay.addEventListener(
        "click",
        () => {

            playHeartAnimation();

        }
    );

}


/* HEART ANIMATION FUNCTION */

function playHeartAnimation() {

    /* tampilkan overlay */

    heartAnimation.classList.add(
        "show"
    );


    /* BIG HEART */

    const bigHeart =
        document.createElement("div");

    bigHeart.className =
        "test-heart";

    bigHeart.textContent =
        "♥";


    heartAnimation.appendChild(
        bigHeart
    );


    /* AFTER BIG HEART */

    setTimeout(() => {

        /*
         * hati besar mulai pecah
         */

        bigHeart.style.transition =
            "transform .5s ease, opacity .5s ease";

        bigHeart.style.transform =
            "translate(-50%, -50%) scale(1.5)";

        bigHeart.style.opacity =
            "0";


        /* FOR SMALL HEART */

        for (
            let i = 0;
            i < 45;
            i++
        ) {

            createSmallHeart();

        }


    }, 1000);


    /* CLEANUP */

    setTimeout(() => {
    if (bigHeart) {
        bigHeart.remove();
    }

    heartAnimation.classList.remove(
        "show"
    );

    // Munculkan kata-kata final
    setTimeout(() => {
        if (finalWords) {
            finalWords.classList.add("show");
        }
    }, 700);

}, 2800);

}


/* CREATE SMALL HEART */

function createSmallHeart() {

    const heart =
        document.createElement("span");


    heart.className =
        "small-heart";


    heart.textContent =
        "♥";


    /* random size */

    const size =
        12 +
        Math.random() * 25;

    heart.style.fontSize =
        `${size}px`;


    /* random opacity */

    heart.style.opacity =
        "1";


    /* tambahkan ke layar */

    heartAnimation.appendChild(
        heart
    );


    /* random arah */

    const angle =
        Math.random() *
        Math.PI *
        2;


    const distance =
        180 +
        Math.random() * 350;


    const x =
        Math.cos(angle) *
        distance;


    const y =
        Math.sin(angle) *
        distance;


    /* sedikit delay supaya lebih natural */

    setTimeout(() => {

        heart.style.transform =
            `
            translate(
                calc(-50% + ${x}px),
                calc(-50% + ${y}px)
            )
            scale(.25)
            `;

        heart.style.opacity =
            "0";

    }, 50);


    /* hapus setelah animasi */

    setTimeout(() => {

        heart.remove();

    }, 1800);

}


/* 6. ESC KEY */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            photoViewer
        ) {

            photoViewer.classList.remove(
                "active"
            );

        }

    }
);


/* 7. INITIAL STATE*/

document.body.style.overflow =
    "hidden";


console.log(
    "🎂 Happy Birthday website loaded!"
);