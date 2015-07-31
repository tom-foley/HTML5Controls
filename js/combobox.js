(function () {

    'use strict';

    window.ComboBox = function () {
        var control = this;

        control.comboBoxList = ["one", "two", "three", "four", "five", "six",
                             "seven", "eight", "nine", "ten", "eleven", "twelve"];
        control.currentList = [];


        /*
         *  Main
         */
        control.init = function () {
            control.initializeComboBoxes();
            this.addEventListeners();
        }


        /*
         *  Public Methods
         */
        control.initializeComboBoxes = function (ev) {
            var comboBoxes = document.getElementsByClassName('combobox');

            if (comboBoxes) {
                var i, j;
                var comboBox, comboBoxDrp, comboBoxDrpArrow;
                
                var parent = comboBoxes[0].parentNode;
                for (i = 0; i < comboBoxes.length; i++) {
                    comboBox = comboBoxes[i];

                    // set list-id
                    comboBox.setAttribute('data-combobox-id', i.toString());
                    comboBox.value = control.comboBoxList[0];

                    // create dropdown element
                    comboBoxDrp = document.createElement('div');
                    comboBoxDrp.id = 'drp' + i.toString();
                    comboBoxDrp.className = 'combobox-drp';

                    var ul, li, span, listItem;
                    ul = document.createElement('ul');

                    for (j = 0; j < control.comboBoxList.length; j++) {
                        listItem = control.comboBoxList[j];
                        li = document.createElement('li');
                        li.setAttribute('data-combobox-id', i.toString());
                        li.setAttribute('value', listItem);
                        li.addEventListener('click', displaySelectedValue, false);
                        //li.addEventListener('keyup', function () {
                        //    console.log(comboBox)
                        //}, false);
                        span = document.createElement('span');
                        span.innerHTML = listItem;
                        li.appendChild(span);

                        ul.appendChild(li);
                    }
                    comboBoxDrp.appendChild(ul);

                    // create dropdown arrow on RHS of input box
                    comboBoxDrpArrow = document.createElement('div');
                    comboBoxDrpArrow.className = 'combobox-drp-arrow';
                    comboBoxDrpArrow.addEventListener('click', toggleComboBoxDrp, false);
                    comboBoxDrpArrow.drp = comboBoxDrp;

                    // append it to input box
                    if (comboBoxes[i].nextSibling) {
                        parent.insertBefore(comboBoxDrpArrow, comboBox.nextSibling);
                        parent.insertBefore(comboBoxDrp, comboBoxDrpArrow.nextSibling);
                    } else {
                        parent.appendChild(comboBoxDrpArrow);
                        parent.appendChild(comboBoxDrp);
                    }
                }
            }
        }

        control.addEventListeners = function (ev) {
            var comboBoxDrp = document.getElementById('combobox-drp');
            var comboBoxInput = document.getElementById('combobox-input');

            if (comboBoxDrp) {
                comboBoxDrp.addEventListener('click', toggleComboBoxDrp, false);
            }

            if (comboBoxInput) {
                comboBoxInput.addEventListener('keyup', refreshDropdownList, false)
            }
        }

        control.init();


        /*
         *  Private methods
         */
        // TODO: When user selects list item(either click or enter),
        // display it in input box
        function displaySelectedValue(ev) {
            var i, 
                comboBoxes = document.getElementsByClassName('combobox'),
                id = this.getAttribute('data-combobox-id');

            for (i = 0; i < comboBoxes.length; i++) {
                if (comboBoxes[i].getAttribute('data-combobox-id') == id) {
                    comboBoxes[i].value = this.value;
                    return;
                }
            }
        }

        // TODO: If focus is on input box and user keys down, move focus to first list item. 
        // Else, if focus is on top list item and user keys up, move focus to input box
        function changeComboBoxFocus(ev) {
            var keyPressed;
            if (ev) {
                ev.preventDefault();
                keyPressed = (ev.keyCode) ? ev.keyCode : ev.charCode;
            }
        }

        function filterKeyPressed(ev) {
            return ev.indexOf(this.value) > -1;
        }


        /*
         *  Adds/Removes classes to trigger animations for ComboBox.
         *  Triggered by clicking on inputBox, arrowButton, or tabbing
         */
        function toggleComboBoxDrp(el) {
            var drp = el.target.drp;
            if (drp.classList.contains('active')) {
                drp.classList.remove('active');
            } else {
                drp.classList.add('active');
            }
        }


        /*
         *  Adds/Removes classes to trigger animations for ComboBox.
         *  Triggered by clicking on inputBox, arrowButton, or tabbing
         */
        function refreshDropdownList(ev) {
            var inputString, keyPressed;
            if (ev) {
                ev.preventDefault();
                keyPressed = (ev.keyCode) ? ev.keyCode : ev.charCode;
                inputString = { value: this.value };

                if (inputString.value.length === 0) {
                    return;
                } else if (inputString.value.length === 1) {
                    control.currentList = control.comboBoxList.filter(filterKeyPressed, inputString);
                } else if (inputString.value.length > 1 && control.currentList.length > 0) {
                    var tmpList = control.currentList.filter(filterKeyPressed, inputString);
                    control.currentList = tmpList;
                }
                if (control.currentList.length > 0) {
                    var listNode = document.createElement("ul"), listItemNode;
                    listNode.setAttribute("id", "results-list");
                    for (var i = 0; i < control.currentList.length; i++) {
                        listItemNode = document.createElement("li");
                        listItemNode.appendChild(document.createTextNode(control.currentList[i].toString()));
                        listNode.appendChild(listItemNode);
                    }
                    dropdown.appendChild(listNode);
                    dropdown.style.display = "block";
                } else {
                    return;
                }
            }
        }
    }
})();
var comboBox = new ComboBox();