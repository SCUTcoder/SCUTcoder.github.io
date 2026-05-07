document.addEventListener('DOMContentLoaded', () => {
    const digitalTime = document.getElementById('digitalTime');
    const dateLine = document.getElementById('dateLine');
    const chinaTime = document.getElementById('chinaTime');
    const hourHand = document.getElementById('hourHand');
    const minuteHand = document.getElementById('minuteHand');
    const secondHand = document.getElementById('secondHand');

    const chinaFormatter = new Intl.DateTimeFormat('zh-CN', {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    const timeFormatter = new Intl.DateTimeFormat('zh-CN', {
        timeZone: 'Asia/Shanghai',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    function getChinaParts(date) {
        return Object.fromEntries(
            chinaFormatter.formatToParts(date)
                .filter(part => part.type !== 'literal')
                .map(part => [part.type, part.value])
        );
    }

    function updateClock() {
        const now = new Date();
        const heWeihangDate = new Date(now.getTime() - 60 * 60 * 1000);
        const parts = getChinaParts(heWeihangDate);
        const chinaNow = timeFormatter.format(now);
        const hours = Number(parts.hour);
        const minutes = Number(parts.minute);
        const seconds = Number(parts.second);

        digitalTime.textContent = `${parts.hour}:${parts.minute}:${parts.second}`;
        digitalTime.dateTime = heWeihangDate.toISOString();
        dateLine.textContent = `${parts.year}年${parts.month}月${parts.day}日 ${parts.weekday}`;
        chinaTime.textContent = `中国时间 ${chinaNow}`;

        const secondDeg = seconds * 6;
        const minuteDeg = (minutes + seconds / 60) * 6;
        const hourDeg = ((hours % 12) + minutes / 60) * 30;

        secondHand.style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
        minuteHand.style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
        hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
    }

    updateClock();
    setInterval(updateClock, 1000);
});
