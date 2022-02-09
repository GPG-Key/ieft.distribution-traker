$(document)
    .ready(function () {
        var form = $(".ipr-form");

        $('.draft-add-row')
            .on("click", function () {
                var template = form.find('.draft-row.template');
                var el = template.clone(true)
                    .removeClass("template visually-hidden");

                var totalField = $('#id_iprdocrel_set-TOTAL_FORMS');
                var total = +totalField.val();

                el.find("*[for*=iprdocrel], *[id*=iprdocrel], *[name*=iprdocrel]")
                    .not(".visually-hidden")
                    .each(function () {
                        var x = $(this);
                        ["for", "id", "name"].forEach(function (at) {
                            var val = x.attr(at);
                            if (val && val.match("iprdocrel")) {
                                x.attr(at, val.replace('-1-', '-' + total + '-'));
                            }
                        });
                    });
                ++total;

                totalField.val(total);

                template.before(el);
                // el.find(".select2-field")
                //     .each(function () {
                //         setupSelect2Field($(this));
                //     });
            });

        function updateRevisions() {
            if ($(this)
                .hasClass("template"))
                return;

            var selectbox = $(this)
                .find('[name$="document"]');

            if (selectbox.val()) {
                var name = selectbox.select2("data")[0]
                    .text;
                var prefix = name.toLowerCase()
                    .substring(0, 3);
                if (prefix == "rfc" || prefix == "bcp" || prefix == "std")
                    $(this)
                    .find('[name$=revisions]')
                    .val("")
                    .hide();
                else
                    $(this)
                    .find('[name$=revisions]')
                    .show();
            }
        }

        form.on("change", ".select2-field", function () {
            $(this)
                .closest(".draft-row")
                .each(updateRevisions);
        });

        // add a little bit of delay to let the select2 box have time to do its magic
        setTimeout(function () {
            form.find(".draft-row")
                .each(updateRevisions);
        }, 10);
    });