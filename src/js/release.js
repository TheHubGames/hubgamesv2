
document.addEventListener("DOMContentLoaded", function () {
    const repoOwner = "TheHubGames"; // Remplacez par le nom du propriétaire du dépôt
    const repoName = "hub_games"; // Remplacez par le nom du dépôt

    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/releases/latest`;

    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    "Erreur lors de la récupération de la dernière release depuis GitHub"
                );
            }
        return response.json();
        })

        .then((data) => {
            const releasesDiv = document.getElementById("github-releases");
            const md = window.markdownit();
            document.getElementById("load").style.display = "none";

            const releaseContainer = document.createElement("div");
            releaseContainer.classList.add(
                "card",
                "m-2",
                "lg:card-side",
                "bg-base-300",
                "shadow-xl"
            );

            const firstFewLines = data.body.split("\n").slice(0, 8).join("\n"); // Récupère les 8 premières lignes
            const releaseHTML = `<div class="lg:w-1/3 card-body">
                    <h2 class="news-title accent-content light:base-100 text-4xl-sm"><i class="fa-solid fa-bullhorn"></i> ${
                        data.name
                    }</h2>
                    <div class="news-text neutral-content">${md.render(
                        firstFewLines
                    )}</div>
                    <div class="card-actions justify-end">
                        <a href="hub_source/MAJ/Derniere_maj" class="btn btn-primary" target="_blank">Lire la suite</a>
                    </div>
                </div>
                <!--<figure><img class="mr-6 rounded object-cover hidden lg:block" src="https://hubgames.studio/content/rsrc_maj/1.X.X/" alt="" /></figure>-->`;
            releaseContainer.innerHTML = releaseHTML;

            releasesDiv.appendChild(releaseContainer);
        })
        .catch((error) => {
            const releasesDiv = document.getElementById("github-releases");
            releasesDiv.innerHTML =
            "<p>Erreur lors de la récupération de la dernière release depuis GitHub</p>";
        console.error(
            "Erreur lors de la récupération de la dernière release depuis GitHub",
        error
        );
    });
});