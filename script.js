function generateGroups() {
    const totalMembers = getInputValue("total-members");
    const femaleMembersCount = getInputValue("female-members");
    const totalGroups = getInputValue("total-groups");

    if (!validateInputs(totalMembers, femaleMembersCount, totalGroups)) return;

    const members = createNumberArray(totalMembers);
    let femaleMembers = createNumberArray(femaleMembersCount);
    const groups = initializeGroups(totalGroups);

    assignFemaleMembers(femaleMembers, groups, totalGroups);
    assignRemainingMembers(members, groups, totalGroups, totalMembers);

    displayResults(groups);
}

function getInputValue(id) {
    return parseInt(document.getElementById(id).value);
}

function validateInputs(...values) {
    if (values.some(value => isNaN(value))) {
        alert("すべてのフィールドに正しい値を入力してください。");
        return false;
    }
    return true;
}

function createNumberArray(length) {
    return Array.from({ length }, (_, i) => i + 1);
}

function initializeGroups(totalGroups) {
    return Array.from({ length: totalGroups }, () => []);
}

function assignFemaleMembers(femaleMembers, groups, totalGroups) {
    shuffleArray(femaleMembers);
    for (let i = 0; femaleMembers.length > 0; i++) {
        groups[i].push(...femaleMembers.splice(0, Math.min(2, femaleMembers.length)));
    }
}

function assignRemainingMembers(members, groups, totalGroups, totalMembers) {
    const remainingMembers = members.filter(m => !groups.flat().includes(m));
    shuffleArray(remainingMembers);

    const groupSize = Math.floor(totalMembers / totalGroups);
    const extraMembers = totalMembers % totalGroups;

    for (let i = 0; i < totalGroups; i++) {
        const targetSize = groupSize + (i < extraMembers ? 1 : 0);
        while (groups[i].length < targetSize && remainingMembers.length > 0) {
            groups[i].push(remainingMembers.shift());
        }
        groups[i].sort((a, b) => a - b);
    }
}

function displayResults(groups) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    // 班を最小番号のメンバーでソート
    const sortedGroups = groups
        .map((members, index) => ({ members, originalIndex: index }))
        .sort((a, b) => Math.min(...a.members) - Math.min(...b.members));

    sortedGroups.forEach((group, newIndex) => {
        const groupDiv = document.createElement("div");
        groupDiv.textContent = `班 ${newIndex + 1}: ${group.members.map(m => String(m).padStart(2, "0")).join(", ")}`;
        resultsDiv.appendChild(groupDiv);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 配列をシャッフルする関数
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
