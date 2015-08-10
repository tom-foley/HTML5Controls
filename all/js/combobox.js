(function () {

    'use strict';

    window.ComboBox = function () {
        var comboBox = this;

        comboBox.fullList = ["one", "two", "three", "four", "five", "six",
                             "seven", "eight", "nine", "ten", "eleven", "twelve"];
        comboBox.activeList = [];


        /*
         *  Main
         */
        comboBox.init = function () {
            comboBox.initializeComboBoxes();
            this.addEventListeners();
        }


        /*
         *  Public Methods
         */
        comboBox.initializeComboBoxes = function (ev) {
            var boxes = document.getElementsByClassName('combobox');

            if (boxes) {
                var i, j;
                var currentBox, drp, drpArrow;
                
                var parent = boxes[0].parentNode;
                for (i = 0; i < boxes.length; i++) {
                    currentBox = boxes[i];

                    // set list-id
                    currentBox.setAttribute('data-combobox-id', i.toString());
                    currentBox.value = comboBox.fullList[0];

                    // create dropdown element
                    drp = document.createElement('div');
                    drp.id = 'drp' + i.toString();
                    drp.className = 'combobox-drp';

                    var ul, li, span, listItem;
                    ul = document.createElement('ul');

                    for (j = 0; j < comboBox.fullList.length; j++) {
                        listItem = comboBox.fullList[j];
                        li = document.createElement('li');
                        li.setAttribute('data-combobox-id', i.toString());
                        li.setAttribute('value', listItem);
                        li.addEventListener('click', displaySelectedValue, false);
                        //li.addEventListener('keyup', function () {
                        //    console.log(currentBox)
                        //}, false);
                        span = document.createElement('span');
                        span.innerHTML = listItem;
                        li.appendChild(span);

                        ul.appendChild(li);
                    }
                    drp.appendChild(ul);

                    // create dropdown arrow on RHS of input box
                    drpArrow = document.createElement('div');
                    drpArrow.className = 'combobox-drp-arrow';
                    drpArrow.addEventListener('click', toggleDrp, false);
                    drpArrow.drp = drp;

                    // append it to input box
                    if (boxes[i].nextSibling) {
                        parent.insertBefore(drpArrow, currentBox.nextSibling);
                        parent.insertBefore(drp, drpArrow.nextSibling);
                    } else {
                        parent.appendChild(drpArrow);
                        parent.appendChild(drp);
                    }
                }
            }
        }

        comboBox.addEventListeners = function (ev) {
            var drp = document.getElementById('combobox-drp');
            var comboBoxInput = document.getElementById('combobox-input');

            if (drp) {
                drp.addEventListener('click', toggleDrp, false);
            }

            if (comboBoxInput) {
                comboBoxInput.addEventListener('keyup', refreshDropdownList, false)
            }
        }

        comboBox.init();


        /*
         *  Private methods
         */
        // TODO: When user selects list item(either click or enter),
        // display it in input box
        function displaySelectedValue(ev) {
            var i, 
                boxes = document.getElementsByClassName('combobox'),
                id = this.getAttribute('data-combobox-id');

            for (i = 0; i < boxes.length; i++) {
                if (boxes[i].getAttribute('data-combobox-id') == id) {
                    boxes[i].value = this.value;
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
        function toggleDrp(el) {
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
                    comboBox.activeList = comboBox.fullList.filter(filterKeyPressed, inputString);
                } else if (inputString.value.length > 1 && comboBox.activeList.length > 0) {
                    var tmpList = comboBox.activeList.filter(filterKeyPressed, inputString);
                    comboBox.activeList = tmpList;
                }
                if (comboBox.activeList.length > 0) {
                    var listNode = document.createElement("ul"), listItemNode;
                    listNode.setAttribute("id", "results-list");
                    for (var i = 0; i < comboBox.activeList.length; i++) {
                        listItemNode = document.createElement("li");
                        listItemNode.appendChild(document.createTextNode(comboBox.activeList[i].toString()));
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