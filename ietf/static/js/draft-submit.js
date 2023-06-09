$(function () {
    // fill in submitter info when an author button is clicked
    $("form.idsubmit button.author")
        .on("click", function () {
            var name = $(this)
                .data("name");
            var email = $(this)
                .data("email");

            $(this)
                .parents("form")
                .find("input[name=submitter-name]")
                .val(name || "");
            $(this)
                .parents("form")
                .find("input[name=submitter-email]")
                .val(email || "");
        });

    $("form.idsubmit")
        .on("submit", function () {
            if (this.submittedAlready)
                return false;
            else {
                this.submittedAlready = true;
                return true;
            }
        });

    $("form.idsubmit #add-author")
        .on("click", function () {
            // clone the last author block and make it empty
            var cloner = $("#cloner");
            var next = cloner.clone();
            next.find('input:not([type=hidden])')
                .val('');

            // find the author number
            var t = next.children('h3')
                .text();
            var n = parseInt(t.replace(/\D/g, ''));

            // change the number in attributes and text
            next.find('*')
                .each(function () {
                    var e = this;
                    $.each(['id', 'for', 'name', 'value'], function (i, v) {
                        if ($(e)
                            .attr(v)) {
                            $(e)
                                .attr(v, $(e)
                                    .attr(v)
                                    .replace(n - 1, n));
                        }
                    });
                });

            t = t.replace(n, n + 1);
            next.children('h3')
                .text(t);

            // move the cloner id to next and insert next into the DOM
            cloner.removeAttr('id');
            next.attr('id', 'cloner');
            next.insertAfter(cloner);

        });

    // Reload page periodically if the enableAutoReload checkbox is present and checked
    const autoReloadSwitch = document.getElementById("enableAutoReload");
    const timeSinceDisplay = document.getElementById("time-since-uploaded");
    if (autoReloadSwitch) {
        const autoReloadTime = 30000; // ms
        let autoReloadTimeoutId;
        autoReloadSwitch.parentElement.classList.remove("d-none");
        timeSinceDisplay.classList.remove("d-none");
        autoReloadTimeoutId = setTimeout(() => location.reload(), autoReloadTime);
        autoReloadSwitch.addEventListener("change", (e) => {
            if (e.currentTarget.checked) {
                if (!autoReloadTimeoutId) {
                    autoReloadTimeoutId = setTimeout(() => location.reload(), autoReloadTime);
                    timeSinceDisplay.classList.remove("d-none");
                }
            } else {
                if (autoReloadTimeoutId) {
                    clearTimeout(autoReloadTimeoutId);
                    autoReloadTimeoutId = null;
                    timeSinceDisplay.classList.add("d-none");
                }
            }
        });
    }
});
