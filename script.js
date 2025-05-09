function generateGroups() {
    const totalMembers = parseInt(document.getElementById("total-members").value);
    const femaleMembersCount = parseInt(document.getElementById("female-members").value);
    const totalGroups = parseInt(document.getElementById("total-groups").value);
    const groupSize = parseInt(document.getElementById("group-size").value);

    if (isNaN(totalMembers) || isNaN(femaleMembersCount) || isNaN(totalGroups) || isNaN(groupSize)) {
        alert("すべてのフィールドに正しい値を入力してください。");
        return;
    }

    // メンバー番号をリスト化
    const members = Array.from({ length: totalMembers }, (_, i) => i + 1);

    // 女子メンバーをリスト化
    let femaleMembers = Array.from({ length: femaleMembersCount }, (_, i) => i + 1);

    // 班の初期化
    const groups = {};
    for (let i = 1; i <= totalGroups; i++) {
        groups[i] = [];
    }

    // 女子メンバーをランダムにシャッフルして班に割り振る
    shuffleArray(femaleMembers);
    for (let i = 0; i < Math.min(totalGroups, femaleMembersCount); i++) {
        const selectedFemale = femaleMembers.splice(0, Math.min(2, femaleMembers.length));
        groups[i + 1].push(...selectedFemale);
    }

    // 残りのメンバーを昇順に割り振る
    const remainingMembers = members.filter(m => !Object.values(groups).flat().includes(m));
    shuffleArray(remainingMembers);

    for (let i = 1; i <= totalGroups; i++) {
        while (groups[i].length < groupSize && remainingMembers.length > 0) {
            groups[i].push(remainingMembers.shift());
        }
        // 各班のメンバーを昇順にソート
        groups[i].sort((a, b) => a - b);
    }

    // 結果を表示
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
    for (const [group, members] of Object.entries(groups)) {
        const groupDiv = document.createElement("div");
        groupDiv.textContent = `班 ${group}: ${members.map(m => String(m).padStart(2, "0")).join(", ")}`;
        resultsDiv.appendChild(groupDiv);
    }
}

// 配列をシャッフルする関数
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}