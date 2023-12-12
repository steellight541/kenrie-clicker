document.addEventListener('DOMContentLoaded', () => {
    // localStorage.clear();
    let cookiesAmount = localStorage.getItem('cookiesAmount') || "0";
    cookiesAmount = parseFloat(cookiesAmount);
    let clicksAmount = localStorage.getItem('clicksAmount') || "0";
    clicksAmount = parseFloat(clicksAmount);
    let clickWeight = localStorage.getItem('clickWeight') || "1";
    clickWeight = parseFloat(clickWeight);

    upgrades = [
        {
            visibility: localStorage.getItem('cursorVisibility') == "true" || false,
            name: "cursor",
            baseCost: 1,
            amount: parseInt(localStorage.getItem('cursorAmount') || "0"),

        },
    ];
    ultimateUpgrades = [
        {
        },
    ];

    document.getElementById('cookies').textContent = cookiesAmount;
    document.getElementById('Clicker').addEventListener('click', addClicks);

    function addCookies() {
        let y = parseFloat(clickWeight);
        let x = parseFloat(cookiesAmount);
        let multiplier = 0;
        upgrades.forEach(upgrade => {
            multiplier += y * (parseInt(upgrade.amount + 1) / 100);
        });
        cookiesAmount = (x + multiplier).toFixed(2);

    }

    function addClicks() {
        let x = parseFloat(clicksAmount)
        clicksAmount = x + 1;
        addCookies();
    }

    setInterval(async () => {
        updateData();
        handleUpgrades();
        let container = document.getElementById('cookies');
        let text = document.createElement('p');
        text.textContent = `You have ${cookiesAmount} cookies`;
        // check if container has any children, if so, remove them
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        container.appendChild(text);
    }, 1);

    function updateData() {
        localStorage.setItem('cookiesAmount', cookiesAmount);
        localStorage.setItem('clicksAmount', clicksAmount);
        localStorage.setItem('clickWeight', clickWeight);
        upgrades.forEach(upgrade => {
            localStorage.setItem(`${upgrade.name}Amount`, upgrade.amount);
            localStorage.setItem(`${upgrade.name}Visibility`, upgrade.visibility);
        });
    }

    function handleUpgrades() {
        upgrades.forEach(upgrade => {
            let cost = upgrade.baseCost * (upgrade.amount + 1);
            if (cookiesAmount >= cost && upgrade.visibility == false) {
                upgrade.visibility = true;
            } else if (upgrade.visibility == true && document.getElementById(upgrade.name) == null) {
                let container = document.createElement('li');
                container.setAttribute('id', upgrade.name);
                let buy = document.createElement('button');
                buy.textContent = `Buy ${upgrade.name} for ${cost} cookies`;
                buy.addEventListener('click', () => {
                    if (cookiesAmount >= cost) {
                        cookiesAmount -= cost;
                        cookiesAmount = cookiesAmount.toFixed(2);
                        clickWeight += 1;
                        upgrade.amount++;
                        cost = upgrade.baseCost + (upgrade.amount * upgrade.baseCost);

                        buy.textContent = `Buy ${upgrade.name} for ${cost} cookies`;
                    }
                });
                container.appendChild(buy);
                document.getElementById('Upgrades').appendChild(container);
            }
        });

    }
});