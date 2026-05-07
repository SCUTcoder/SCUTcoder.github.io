document.addEventListener('DOMContentLoaded', () => {
    const digitalTime = document.getElementById('digitalTime');
    const dateLine = document.getElementById('dateLine');
    const chinaTime = document.getElementById('chinaTime');
    const hourHand = document.getElementById('hourHand');
    const minuteHand = document.getElementById('minuteHand');
    const secondHand = document.getElementById('secondHand');
    const delaySlider = document.getElementById('delaySlider');
    const delayValue = document.getElementById('delayValue');
    const timezoneBadge = document.getElementById('timezoneBadge');
    const offsetFact = document.getElementById('offsetFact');
    const punctualityFact = document.getElementById('punctualityFact');
    const arrivalFact = document.getElementById('arrivalFact');
    const clockOffset = document.getElementById('clockOffset');
    const clockNote = document.getElementById('clockNote');

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

    function getDelayMinutes() {
        return Number(delaySlider?.value ?? 60);
    }

    function formatOffset(minutes) {
        const sign = minutes === 0 ? '+' : '-';
        const hours = String(Math.floor(minutes / 60)).padStart(2, '0');
        const mins = String(minutes % 60).padStart(2, '0');
        return `${sign}${hours}:${mins}`;
    }

    function formatDelay(minutes) {
        if (minutes === 0) return '不慢';
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hours === 0) return `慢 ${mins} 分钟`;
        if (mins === 0) return `慢 ${hours} 小时`;
        return `慢 ${hours} 小时 ${mins} 分钟`;
    }

    function formatClockOffset(minutes) {
        if (minutes === 0) return '0H';
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hours === 0) return `-${mins}M`;
        if (mins === 0) return `-${hours}H`;
        return `-${hours}H${mins}M`;
    }

    function formatUtcOffset(minutes) {
        const totalMinutes = 8 * 60 - minutes;
        const sign = totalMinutes >= 0 ? '+' : '-';
        const absMinutes = Math.abs(totalMinutes);
        const hours = Math.floor(absMinutes / 60);
        const mins = absMinutes % 60;
        return mins === 0 ? `UTC${sign}${hours}` : `UTC${sign}${hours}:${String(mins).padStart(2, '0')}`;
    }

    function getTimeMood(minutes) {
        if (minutes === 0) {
            return { punctuality: '奇迹', arrival: '真到了', note: '何苇杭时区短暂接入现实时间' };
        }
        if (minutes <= 30) {
            return { punctuality: '还行', arrival: '快了', note: `${formatDelay(minutes)}，属于轻微缓冲` };
        }
        if (minutes <= 60) {
            return { punctuality: '随缘', arrival: '马上', note: `${formatDelay(minutes)}，稳定运行中` };
        }
        if (minutes <= 120) {
            return { punctuality: '很低', arrival: '包的', note: `${formatDelay(minutes)}，包的兄弟马上到` };
        }
        return { punctuality: '离线', arrival: '在路上', note: `${formatDelay(minutes)}，怎么可能迟到` };
    }

    function updateDelayUI() {
        const delayMinutes = getDelayMinutes();
        const offset = formatOffset(delayMinutes);
        const delayLabel = formatDelay(delayMinutes);
        const mood = getTimeMood(delayMinutes);
        const utcLabel = formatUtcOffset(delayMinutes);

        delayValue.textContent = delayLabel;
        timezoneBadge.textContent = `${utcLabel} · China ${offset}`;
        offsetFact.textContent = offset;
        punctualityFact.textContent = mood.punctuality;
        arrivalFact.textContent = mood.arrival;
        clockOffset.textContent = formatClockOffset(delayMinutes);
        clockNote.textContent = mood.note;
    }

    function updateClock() {
        const now = new Date();
        const delayMinutes = getDelayMinutes();
        const heWeihangDate = new Date(now.getTime() - delayMinutes * 60 * 1000);
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

    delaySlider?.addEventListener('input', () => {
        updateDelayUI();
        updateClock();
    });

    updateDelayUI();
    updateClock();
    setInterval(updateClock, 1000);
});
