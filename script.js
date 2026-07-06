(function(){var c=document.getElementById('particleCanvas');if(!c)return;var x=c.getContext('2d'),w,h,stars=[],N=80;function R(){w=c.width=innerWidth;h=c.height=innerHeight;}R();addEventListener('resize',R);for(var i=0;i<N;i++)stars.push({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.2+.3,baseA:Math.random()*.4+.1,phase:Math.random()*6.28,speed:Math.random()*.008+.003});(function D(){x.clearRect(0,0,w,h);var t=Date.now()*.001;for(var i=0;i<N;i++){var s=stars[i];var a=s.baseA+Math.sin(t*2+s.phase)*.15;x.beginPath();x.arc(s.x,s.y,s.r,0,6.28);x.fillStyle='rgba(180,200,255,'+Math.max(0,a)+')';x.fill();if(s.r>1){x.beginPath();x.arc(s.x,s.y,s.r*2.5,0,6.28);x.fillStyle='rgba(140,170,255,'+Math.max(0,a*.15)+')';x.fill()}}requestAnimationFrame(D)})();})();

let currentStep = 1;
const totalSteps = 5;
let diagnosisData = {
    avatar: null,
    height: '',
    weight: '',
    insomniaDuration: '',
    insomniaSymptoms: [],
    sleepMeds: [],
    facePhoto: null,
    tonguePhoto: null,
    questionnaire: {}
};

// 两级归属
(function(){var u=new URL(location.href),r1=u.searchParams.get('ref')||u.searchParams.get('ref1')||'',r2=u.searchParams.get('ref2')||'';if(r1){localStorage.setItem('lh_r1',r1);if(r2)localStorage.setItem('lh_r2',r2)}else{r1=localStorage.getItem('lh_r1')||'';r2=localStorage.getItem('lh_r2')||''}if(r1){var b=document.getElementById('refInfoBar');if(b)b.classList.remove('hidden');var n=document.getElementById('refName1');if(n)n.textContent=r1;if(r2){var b2=document.getElementById('refBadge2'),n2=document.getElementById('refName2');if(b2)b2.style.display='inline-flex';if(n2)n2.textContent=r2}}})();

// 可配置方案
var DEFAULT_CFG={'\u5e73\u548c\u4f53\u8d28':{sleepAdvice:['\u4fdd\u6301\u89c4\u5f8b\u4f5c\u606f\uff0c\u665a\u4e0a10-11\u70b9\u5165\u7761','\u7761\u524d\u907f\u514d\u4f7f\u7528\u7535\u5b50\u8bbe\u5907','\u521b\u9020\u5b89\u9759\u3001\u9ed1\u6697\u3001\u51c9\u723d\u7684\u7761\u7720\u73af\u5883','\u9002\u5f53\u5348\u4f11\uff0c\u4f46\u4e0d\u8d85\u8fc730\u5206\u949f'],treatmentPlan:['\u4fdd\u6301\u73b0\u6709\u826f\u597d\u751f\u6d3b\u4e60\u60ef','\u9002\u5f53\u8fd0\u52a8\uff0c\u5982\u6563\u6b65\u3001\u592a\u6781\u62f3','\u996e\u98df\u6e05\u6de1\uff0c\u8425\u517b\u5747\u8861','\u5b9a\u671f\u4f53\u68c0\uff0c\u9884\u9632\u75be\u75c5'],products:[{name:'\u5b89\u795e\u52a9\u7720\u8336',desc:'\u767e\u5408\u83b2\u5b50\u914d\u65b9\uff0c\u5b81\u5fc3\u5b89\u795e',price:'\u00a5128',img:'ri-cup-line'}]},'\u9634\u865a\u4f53\u8d28':{sleepAdvice:['\u6ecb\u9634\u5b89\u795e\uff0c\u665a\u4e0a9-10\u70b9\u5165\u7761','\u7761\u524d\u559d\u4e00\u676f\u6e29\u725b\u5976\u6216\u67b8\u675e\u8336','\u907f\u514d\u71ac\u591c\uff0c\u517b\u9634\u5b89\u795e','\u53ef\u7528\u767e\u5408\u3001\u83b2\u5b50\u716e\u7ca5\u52a9\u7720'],treatmentPlan:['\u6ecb\u9634\u6da6\u71e5\uff0c\u591a\u5403\u68a8\u3001\u767e\u5408\u3001\u94f6\u8033','\u907f\u514d\u8f9b\u8fa3\u71e5\u70ed\u98df\u7269','\u7ec3\u4e60\u7491\u4f3d\u3001\u51a5\u60f3\u7b49\u9759\u5fc3\u8fd0\u52a8','\u5982\u9700\u4e2d\u6210\u836f\u8c03\u7406\uff0c\u8bf7\u5148\u54a8\u8be2\u4e13\u4e1a\u533b\u5e08'],products:[{name:'\u6ecb\u9634\u6da6\u71e5\u818f',desc:'\u516d\u5473\u5730\u9ec4\u914d\u65b9\uff0c\u6ecb\u9634\u964d\u706b',price:'\u00a5198',img:'ri-medicine-bottle-line'}]},'\u6c14\u865a\u4f53\u8d28':{sleepAdvice:['\u8865\u6c14\u517b\u8840\uff0c\u4fdd\u8bc1\u5145\u8db3\u7761\u7720','\u7761\u524d\u907f\u514d\u8fc7\u5ea6\u601d\u8651','\u53ef\u9002\u5f53\u6309\u6469\u8db3\u4e09\u91cc\u7a74','\u7528\u7ea2\u67a3\u3001\u6842\u5706\u716e\u6c34\u559d'],treatmentPlan:['\u8865\u6c14\u5065\u813e\uff0c\u591a\u5403\u5c71\u836f\u3001\u7ea2\u67a3\u3001\u9ec4\u8302','\u907f\u514d\u8fc7\u5ea6\u52b3\u7d2f','\u7ec3\u4e60\u516b\u6bb5\u9526\u3001\u6c14\u529f\u7b49','\u5982\u9700\u4e2d\u6210\u836f\u8c03\u7406\uff0c\u8bf7\u5148\u54a8\u8be2\u4e13\u4e1a\u533b\u5e08'],products:[{name:'\u8865\u6c14\u517b\u8840\u8336',desc:'\u9ec4\u8302\u5f53\u5f52\u914d\u65b9\uff0c\u76ca\u6c14\u751f\u8840',price:'\u00a5158',img:'ri-cup-line'}]},'\u75f0\u6e7f\u4f53\u8d28':{sleepAdvice:['\u5065\u813e\u795b\u6e7f\uff0c\u907f\u514d\u7761\u524d\u8fc7\u9971','\u665a\u9910\u5b9c\u6e05\u6de1\uff0c\u7761\u524d3\u5c0f\u65f6\u4e0d\u8fdb\u98df','\u53ef\u9002\u5f53\u8fd0\u52a8\u4fc3\u8fdb\u6e7f\u6c14\u6392\u51fa','\u7528\u9648\u76ae\u3001\u832f\u82d3\u6ce1\u6c34\u559d'],treatmentPlan:['\u5065\u813e\u795b\u6e7f\uff0c\u591a\u5403\u858f\u7c73\u3001\u8d64\u5c0f\u8c46','\u907f\u514d\u80a5\u7518\u539a\u5473\u98df\u7269','\u589e\u52a0\u6709\u6c27\u8fd0\u52a8\uff0c\u5982\u5feb\u8d70\u3001\u6e38\u6cf3','\u5982\u9700\u4e2d\u6210\u836f\u8c03\u7406\uff0c\u8bf7\u5148\u54a8\u8be2\u4e13\u4e1a\u533b\u5e08'],products:[{name:'\u5065\u813e\u795b\u6e7f\u4e38',desc:'\u4e8c\u9648\u6c64\u914d\u65b9\uff0c\u5316\u75f0\u795b\u6e7f',price:'\u00a5168',img:'ri-medicine-bottle-line'}]}};
function getConfig(){try{var s=localStorage.getItem('lh_cfg');if(s)return JSON.parse(s)}catch(e){}return JSON.parse(JSON.stringify(DEFAULT_CFG))}
function saveConfig(cfg){localStorage.setItem('lh_cfg',JSON.stringify(cfg))}
var FIXED_RECOMMENDED_PRODUCTS = [
    { name: '好梦天始睡眠乳膏套盒+负氧离子睡眠仪', desc: '组合参考', img: 'ri-moon-clear-line' }
];
var SAFE_RESULT_LABELS = {
    '平和体质': { name: '平衡型', desc: '整体状态较为平衡，建议继续保持稳定作息。' },
    '阴虚体质': { name: '偏热型', desc: '夜间烦躁与睡眠波动倾向较明显，建议重点关注放松与作息节律。' },
    '气虚体质': { name: '偏弱型', desc: '精力恢复与睡眠稳定性偏弱，建议关注饮食节律与低强度活动。' },
    '痰湿体质': { name: '偏重型', desc: '饮食与作息负担偏重，建议关注清淡饮食和规律运动。' }
};
var SAFE_SLEEP_ADVICE = {
    '平和体质': ['保持固定上床和起床时间', '睡前30分钟减少手机和短视频刺激', '卧室保持安静、遮光、温度舒适', '午休控制在30分钟以内'],
    '阴虚体质': ['睡前安排10分钟呼吸放松', '晚间减少辛辣、浓茶、咖啡等刺激', '固定睡前流程，让身体形成入睡提示', '睡前可做轻柔拉伸或冥想'],
    '气虚体质': ['白天安排低强度散步，避免过度劳累', '晚餐不过饱，保持饮食节律', '午后减少长时间补觉', '睡前减少思虑型活动'],
    '痰湿体质': ['晚餐清淡，睡前3小时尽量不进食', '每天保持轻出汗活动', '减少久坐，饭后可慢走', '卧室保持通风干爽']
};
var SAFE_TREATMENT_PLAN = {
    '平和体质': ['继续保持稳定作息和均衡饮食', '每周保持3次以上轻运动', '定期记录睡眠变化', '如有不适请线下就医'],
    '阴虚体质': ['重点建立睡前放松流程', '减少熬夜和夜间高刺激内容', '饮食以清淡、温和为主', '如有不适请线下就医'],
    '气虚体质': ['关注白天精力恢复和活动节律', '运动选择散步、舒缓拉伸等低强度方式', '保持三餐规律，避免过度节食', '如有不适请线下就医'],
    '痰湿体质': ['减少油腻和夜宵频率', '增加规律步行或轻有氧活动', '控制晚间饮食负担', '如有不适请线下就医']
};
function getSafeResult(type) {
    return SAFE_RESULT_LABELS[type] || SAFE_RESULT_LABELS['平和体质'];
}
function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function(ch) {
        return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch];
    });
}

const avatarData = {
    teen: { male: { age: '18岁', height: '175cm', weight: '62kg', insomnia: '偶尔失眠', name: '阳光少年', img: 'assets/avatars/teen-male.png' },
            female: { age: '17岁', height: '162cm', weight: '50kg', insomnia: '睡眠良好', name: '青春少女', img: 'assets/avatars/teen-female.png' } },
    young: { male: { age: '28岁', height: '178cm', weight: '72kg', insomnia: '经常熬夜', name: '职场精英', img: 'assets/avatars/young-male.png' },
             female: { age: '30岁', height: '165cm', weight: '55kg', insomnia: '多梦易醒', name: '都市丽人', img: 'assets/avatars/young-female.png' } },
    middle: { male: { age: '48岁', height: '172cm', weight: '78kg', insomnia: '入睡困难', name: '成熟男士', img: 'assets/avatars/middle-male.png' },
              female: { age: '45岁', height: '160cm', weight: '58kg', insomnia: '早醒疲惫', name: '优雅女士', img: 'assets/avatars/middle-female.png' } },
    senior: { male: { age: '68岁', height: '168cm', weight: '65kg', insomnia: '睡眠浅短', name: '睿智长者', img: 'assets/avatars/senior-male.png' },
              female: { age: '65岁', height: '155cm', weight: '55kg', insomnia: '夜间频醒', name: '慈祥奶奶', img: 'assets/avatars/senior-female.png' } }
};

function createAvatarImg(avatar, className) {
    if (!avatar || !avatar.img) return '';
    return '<img src="' + escapeHtml(avatar.img) + '" alt="' + escapeHtml(avatar.name || '检测形象') + '" class="' + (className || 'avatar-preview-img') + '" loading="lazy">';
}

function initializeAvatarCards() {
    document.querySelectorAll('.avatar-ring').forEach(function(card) {
        var match = (card.getAttribute('onclick') || '').match(/selectAvatar\(this,\s*'([^']+)',\s*'([^']+)'\)/);
        if (!match) return;
        var avatar = avatarData[match[1]] && avatarData[match[1]][match[2]];
        var holder = card.querySelector(':scope > div');
        if (!avatar || !holder) return;
        holder.className = 'avatar-figure mx-auto mb-3 flex items-end justify-center';
        holder.innerHTML = createAvatarImg(avatar, 'avatar-card-img');
    });
}

// Wu Xing (Five Elements) profiles per constitution type
const wuxingProfiles = {
    '平和体质': { mu: 70, huo: 70, tu: 70, jin: 70, shui: 70, desc: '整体分布较均衡，状态稳定度较好。' },
    '阳虚体质': { mu: 45, huo: 35, tu: 50, jin: 55, shui: 75, desc: '恢复能量偏低，夜间保暖与作息稳定可重点关注。' },
    '阴虚体质': { mu: 60, huo: 85, tu: 50, jin: 45, shui: 30, desc: '夜间活跃度偏高，建议关注放松训练与入睡节律。' },
    '气虚体质': { mu: 40, huo: 55, tu: 40, jin: 50, shui: 55, desc: '精力恢复偏弱，建议关注白天活动量与营养节律。' },
    '痰湿体质': { mu: 50, huo: 55, tu: 80, jin: 45, shui: 65, desc: '日常负担指数偏高，建议关注清淡饮食与规律运动。' }
};

function renderWuxing(type) {
    const p = wuxingProfiles[type] || wuxingProfiles['平和体质'];
    ['mu','huo','tu','jin','shui'].forEach(k => {
        const bar = document.getElementById('wx-' + k);
        const val = document.getElementById('wx-' + k + '-val');
        if (bar) { bar.style.width = p[k] + '%'; }
        if (val) { val.textContent = p[k] + '%'; }
    });
    const d = document.getElementById('wuxingDesc');
    if (d) d.textContent = p.desc;
}

function openDiagnosisModal() {
    document.getElementById('diagnosisModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    resetModal();
}

function closeDiagnosisModal() {
    document.getElementById('diagnosisModal').classList.add('hidden');
    document.body.style.overflow = '';
}

function openResultModal() {
    document.getElementById('resultModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeResultModal() {
    document.getElementById('resultModal').classList.add('hidden');
    document.body.style.overflow = '';
}

function resetModal() {
    currentStep = 1;
    diagnosisData = { avatar: null, height: '', weight: '', insomniaDuration: '', insomniaSymptoms: [], sleepMeds: [], facePhoto: null, tonguePhoto: null, questionnaire: {} };
    document.getElementById('userHeight').value = '';
    document.getElementById('userWeight').value = '';
    document.querySelectorAll('.avatar-ring').forEach(el => el.classList.remove('selected'));
    document.querySelectorAll('.option-card').forEach(el => el.classList.remove('selected'));
    resetPhotoPreview('face');
    resetPhotoPreview('tongue');
    updateStepUI();
}

function resetPhotoPreview(type) {
    const img = document.getElementById(type + 'PreviewImg');
    const placeholder = document.getElementById(type + 'Placeholder');
    if (img) img.classList.add('hidden');
    if (placeholder) placeholder.classList.remove('hidden');
}

function updateStepUI() {
    // Hide all steps
    document.querySelectorAll('.step-content').forEach(el => el.classList.add('hidden'));
    document.getElementById('step' + currentStep).classList.remove('hidden');
    document.getElementById('step' + currentStep).classList.add('slide-in');
    var modalContent = document.getElementById('modalContent');
    if (modalContent) modalContent.scrollTop = 0;

    // Update progress dots
    document.querySelectorAll('.step-dot').forEach(dot => {
        const stepNum = parseInt(dot.dataset.step);
        dot.classList.remove('active', 'completed');
        if (stepNum < currentStep) dot.classList.add('completed');
        else if (stepNum === currentStep) dot.classList.add('active');
    });

    // Update progress line
    const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;
    document.getElementById('progressLine').style.width = progressPercent + '%';

    // Update buttons
    document.getElementById('prevBtn').classList.toggle('hidden', currentStep === 1);
    const nextBtn = document.getElementById('nextBtn');
    if (currentStep === totalSteps) {
        nextBtn.innerHTML = '提交分析<i class="ri-check-line ml-1"></i>';
    } else {
        nextBtn.innerHTML = '下一步<i class="ri-arrow-right-line ml-1"></i>';
    }

    // Update titles
    const titles = {
        1: { title: '选择检测形象', subtitle: '请选择与您年龄相近的形象' },
        2: { title: '补充基本信息', subtitle: '完善身高、体重与睡眠状况' },
        3: { title: '拍摄面部照片', subtitle: '请正对镜头，光线充足' },
        4: { title: '拍摄舌头照片', subtitle: '请伸出舌头，自然放松' },
        5: { title: '填写健康问卷', subtitle: '请根据实际情况选择' }
    };
    document.getElementById('modalTitle').textContent = titles[currentStep].title;
    document.getElementById('modalSubtitle').textContent = titles[currentStep].subtitle;
}

function nextStep() {
    if (!validateCurrentStep()) return;

    if (currentStep === totalSteps) {
        submitAnalysis();
        return;
    }

    currentStep++;
    updateStepUI();

    // If moving to step 2, show selected realistic avatar asset in preview
    if (currentStep === 2 && diagnosisData.avatar) {
        const preview = document.getElementById('selectedAvatarPreview');
        if (preview) preview.innerHTML = createAvatarImg(diagnosisData.avatar, 'avatar-preview-img');
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateStepUI();
    }
}

function validateCurrentStep() {
    switch (currentStep) {
        case 1:
            if (!diagnosisData.avatar) { showToast('请选择一个形象', 'warning'); return false; }
            break;
        case 2:
            diagnosisData.height = document.getElementById('userHeight').value;
            diagnosisData.weight = document.getElementById('userWeight').value;
            if (!diagnosisData.height) { showToast('请输入身高', 'warning'); return false; }
            if (!diagnosisData.weight) { showToast('请输入体重', 'warning'); return false; }
            if (!diagnosisData.insomniaDuration) { showToast('请选择失眠时长', 'warning'); return false; }
            if (diagnosisData.insomniaDuration !== 'none' && (!diagnosisData.insomniaSymptoms || diagnosisData.insomniaSymptoms.length === 0)) { showToast('请选择失眠症状', 'warning'); return false; }
            if (!diagnosisData.sleepMeds || diagnosisData.sleepMeds.length === 0) { showToast('请选择是否使用助眠产品', 'warning'); return false; }
            break;
        case 3:
            if (!diagnosisData.facePhoto) { showToast('请拍摄面部照片', 'warning'); return false; }
            break;
        case 4:
            if (!diagnosisData.tonguePhoto) { showToast('请拍摄舌头照片', 'warning'); return false; }
            break;
        case 5:
            const q = diagnosisData.questionnaire;
            if (!q.sleep || !q.energy || !q.diet || !q.exercise) {
                showToast('请完成所有问卷选项', 'warning'); return false;
            }
            break;
    }
    return true;
}

function selectAvatar(el, ageGroup, gender) {
    document.querySelectorAll('.avatar-ring').forEach(a => a.classList.remove('selected'));
    el.classList.add('selected');
    diagnosisData.avatar = { ageGroup, gender, ...avatarData[ageGroup][gender] };
}

function selectOption(el, category, value) {
    // Remove selected from siblings
    el.parentElement.querySelectorAll('.option-card').forEach(card => card.classList.remove('selected'));
    el.classList.add('selected');
    if (category === 'insomniaDuration') {
        diagnosisData.insomniaDuration = value;
        // 选中"无失眠"时自动清空症状
        if (value === 'none') diagnosisData.insomniaSymptoms = [];
    } else if (['sleep','energy','diet','exercise'].includes(category)) {
        diagnosisData.questionnaire[category] = value;
    } else {
        diagnosisData[category] = value;
    }
}

function toggleMultiOption(el, category, value) {
    if (!diagnosisData[category]) diagnosisData[category] = [];
    const arr = diagnosisData[category];
    // 互斥逻辑：选"none/未使用"时清空其它
    if (value === 'none') {
        diagnosisData[category] = ['none'];
        el.parentElement.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
        el.classList.add('selected');
        return;
    }
    // 反选 none
    const noneEl = el.parentElement.querySelector('.option-card.selected');
    if (arr.includes('none')) {
        diagnosisData[category] = [];
        el.parentElement.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
    }
    const idx = diagnosisData[category].indexOf(value);
    if (idx >= 0) {
        diagnosisData[category].splice(idx, 1);
        el.classList.remove('selected');
    } else {
        diagnosisData[category].push(value);
        el.classList.add('selected');
    }
}

function handleFacePhoto(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            diagnosisData.facePhoto = e.target.result;
            const img = document.getElementById('facePreviewImg');
            const placeholder = document.getElementById('facePlaceholder');
            img.src = e.target.result;
            img.classList.remove('hidden');
            placeholder.classList.add('hidden');
        };
        reader.readAsDataURL(file);
    }
}

function handleTonguePhoto(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            diagnosisData.tonguePhoto = e.target.result;
            const img = document.getElementById('tonguePreviewImg');
            const placeholder = document.getElementById('tonguePlaceholder');
            img.src = e.target.result;
            img.classList.remove('hidden');
            placeholder.classList.add('hidden');
        };
        reader.readAsDataURL(file);
    }
}

function submitAnalysis() {
    const result = analyzeConstitution(diagnosisData);
    displayResults(result);
    closeDiagnosisModal();
    openResultModal();
}

function analyzeConstitution(data) {
    const { questionnaire } = data;
    let score = 0;
    let constitution = '平和体质';
    let description = '整体状态较为平衡，保持良好生活习惯';

    if (questionnaire.sleep === 'poor' || questionnaire.sleep === 'very_poor') score += 3;
    if (questionnaire.energy === 'low' || questionnaire.energy === 'very_low') score += 2;
    if (questionnaire.diet === 'greasy') score += 2;
    if (questionnaire.exercise === 'rarely' || questionnaire.exercise === 'never') score += 1;

    if (score >= 6) { constitution = '阴虚体质'; description = '夜间活跃度偏高，睡眠连续性容易波动'; }
    else if (score >= 4) { constitution = '气虚体质'; description = '精力恢复偏弱，容易疲劳'; }
    else if (score >= 2) { constitution = '痰湿体质'; description = '日常负担指数偏高，需要关注饮食与活动节律'; }

    return {
        type: constitution,
        description: description,
        features: getConstitutionFeatures(constitution),
        sleepAdvice: getSleepAdvice(constitution),
        treatmentPlan: getTreatmentPlan(constitution)
    };
}

function getConstitutionFeatures(type) {
    const features = {
        '平和体质': ['面部状态自然，精神状态较稳定','睡眠质量较好，日常节律较规律','舌面颜色与覆盖状态较均衡','情绪稳定，适应能力较好'],
        '阴虚体质': ['夜间活跃度偏高，容易出现入睡波动','睡前放松不足时，睡眠连续性容易下降','舌面颜色偏红，覆盖较少','情绪较敏感，建议减少睡前刺激'],
        '气虚体质': ['白天精力恢复偏弱，容易疲劳','活动量不足时，睡眠稳定性容易波动','舌面颜色偏淡，整体状态偏弱','建议保持轻运动与规律饮食'],
        '痰湿体质': ['饮食与作息负担指数偏高','久坐或晚餐偏重时，夜间舒适度容易下降','舌面覆盖感偏重，需关注清淡节律','建议增加低强度有氧活动']
    };
    return features[type] || features['平和体质'];
}

function getSleepAdvice(type) {
    return SAFE_SLEEP_ADVICE[type] || SAFE_SLEEP_ADVICE['平和体质'];
}

function getTreatmentPlan(type) {
    return SAFE_TREATMENT_PLAN[type] || SAFE_TREATMENT_PLAN['平和体质'];
}

function displayResults(result) {
    var avatar = diagnosisData.avatar;
    if (avatar) {
        var resultAvatar = document.getElementById('resultAvatar');
        if (resultAvatar) resultAvatar.innerHTML = createAvatarImg(avatar, 'avatar-preview-img');
        document.getElementById('resultAge').textContent = avatar.age;
        document.getElementById('resultHeight').textContent = diagnosisData.height + 'cm';
        document.getElementById('resultWeight').textContent = diagnosisData.weight + 'kg';
        var durLabels = { 'none':'无失眠','1-3m':'失眠1-3月','3-6m':'失眠3-6月','6-12m':'失眠半年-1年','1-2y':'失眠1-2年','2-3y':'失眠2-3年','3y+':'失眠3年+' };
        var durPill = { 'none':'success','1-3m':'warn','3-6m':'warn','6-12m':'warn','1-2y':'danger','2-3y':'danger','3y+':'danger' };
        var insEl = document.getElementById('resultInsomnia');
        insEl.textContent = durLabels[diagnosisData.insomniaDuration] || '未知';
        insEl.className = 'pill-tag text-xs ' + (durPill[diagnosisData.insomniaDuration] || '');
    }

    // 综合分析报告
    var q = diagnosisData.questionnaire;
    var healthScore = 90, sleepScore = 85;
    if (q.sleep === 'poor') { healthScore -= 10; sleepScore -= 15; }
    else if (q.sleep === 'very_poor') { healthScore -= 20; sleepScore -= 25; }
    if (q.energy === 'low') { healthScore -= 8; sleepScore -= 5; }
    else if (q.energy === 'very_low') { healthScore -= 15; sleepScore -= 10; }
    if (q.diet === 'greasy') healthScore -= 5;
    if (q.exercise === 'rarely' || q.exercise === 'never') healthScore -= 5;
    if (diagnosisData.insomniaDuration !== 'none' && diagnosisData.insomniaDuration) { sleepScore -= 10; healthScore -= 5; }
    if (diagnosisData.sleepMeds && diagnosisData.sleepMeds.length > 0 && !diagnosisData.sleepMeds.includes('none')) { sleepScore -= 5; }
    healthScore = Math.max(40, Math.min(98, healthScore));
    sleepScore = Math.max(30, Math.min(95, sleepScore));
    document.getElementById('healthScore').textContent = healthScore;
    document.getElementById('sleepScore').textContent = sleepScore;

    var safeResult = getSafeResult(result.type);
    var analysisParts = [];
    analysisParts.push('基于AI多维度样本特征模型，结合睡眠问卷、面部照片、舌面照片和日常习惯信息生成参考结果。');
    if (result.type === '平和体质') analysisParts.push('您的状态分布较均衡，睡眠与日常节律整体稳定。建议继续保持现有生活方式，并定期关注变化。');
    else if (result.type === '阴虚体质') analysisParts.push('您的夜间活跃度偏高，睡前放松不足时更容易影响入睡节律。可重点关注作息固定、睡前放松和饮食清淡。');
    else if (result.type === '气虚体质') analysisParts.push('您的精力恢复指数偏弱，白天疲劳感与睡眠稳定性关联较明显。可重点关注规律饮食、轻运动和午后休息控制。');
    else if (result.type === '痰湿体质') analysisParts.push('您的日常负担指数偏高，晚餐偏重、久坐或活动不足时更容易影响夜间舒适度。可重点关注清淡饮食与规律活动。');
    if (diagnosisData.insomniaDuration && diagnosisData.insomniaDuration !== 'none') {
        var durMap = {'1-3m':'短期','3-6m':'中期','6-12m':'中长期','1-2y':'长期','2-3y':'长期','3y+':'慢性'};
        analysisParts.push('您反馈的睡眠困扰属于' + (durMap[diagnosisData.insomniaDuration]||'') + '波动，可参考以下生活方式建议进行调整。');
    }
    document.getElementById('analysisText').textContent = analysisParts.join('');

    document.getElementById('constitutionType').textContent = safeResult.name;
    document.getElementById('constitutionDesc').textContent = safeResult.desc;

    document.getElementById('constitutionFeatures').innerHTML = result.features.map(function(f){return '<li class="flex items-start gap-2"><i class="ri-check-line text-indigo-500 mt-0.5 text-xs"></i><span>'+escapeHtml(f)+'</span></li>'}).join('');
    document.getElementById('sleepAdvice').innerHTML = result.sleepAdvice.map(function(f){return '<li class="flex items-start gap-2"><i class="ri-moon-line text-amber-500 mt-0.5 text-xs"></i><span>'+escapeHtml(f)+'</span></li>'}).join('');
    document.getElementById('treatmentPlan').innerHTML = result.treatmentPlan.map(function(f){return '<li class="flex items-start gap-2"><i class="ri-leaf-line text-emerald-500 mt-0.5 text-xs"></i><span>'+escapeHtml(f)+'</span></li>'}).join('');

    // 推荐产品
    var products = FIXED_RECOMMENDED_PRODUCTS;
    var prodHtml = '';
    if (products.length === 0) {
        prodHtml = '<p class="text-sm text-slate-400">暂无推荐产品</p>';
    } else {
        products.forEach(function(p){
            prodHtml += '<div class="flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-100"><div class="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center"><i class="'+escapeHtml(p.img || 'ri-medicine-bottle-line')+' text-indigo-500"></i></div><div class="flex-1"><div class="text-base font-bold text-slate-900">'+escapeHtml(p.name)+'</div><div class="text-sm text-slate-400">'+escapeHtml(p.desc)+'</div></div></div>';
        });
    }
    document.getElementById('productRecommendations').innerHTML = prodHtml;

    renderWuxing(result.type);
}

function restartDiagnosis() {
    closeResultModal();
    openDiagnosisModal();
}

function shareResults() {
    const type = document.getElementById('constitutionType').textContent;
    const desc = document.getElementById('constitutionDesc').textContent;
    const features = Array.from(document.getElementById('constitutionFeatures').children).map(li => li.textContent.trim());
    const sleep = Array.from(document.getElementById('sleepAdvice').children).map(li => li.textContent.trim());
    const plan = Array.from(document.getElementById('treatmentPlan').children).map(li => li.textContent.trim());

    const shareText = `AI睡眠数据参考结果\n\n状态类型：${type}\n${desc}\n\n状态倾向：\n${features.join('\n')}\n\n睡眠建议：\n${sleep.join('\n')}\n\n综合建议：\n${plan.join('\n')}`;

    if (navigator.share) {
        navigator.share({ title: 'AI睡眠数据参考结果', text: shareText }).catch(() => {});
    } else {
        navigator.clipboard.writeText(shareText).then(() => showToast('结果已复制到剪贴板', 'success')).catch(() => showToast('复制失败', 'error'));
    }
}

function showToast(message, type) {
    var toast = document.createElement('div');
    toast.className = 'fixed top-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-xl text-white text-sm font-medium z-[80] shadow-lg';
    var colors = { success: 'bg-emerald-500', warning: 'bg-yellow-500', error: 'bg-rose-500', info: 'bg-ai-blue' };
    toast.classList.add(colors[type] || colors.info);
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(function(){ toast.remove() }, 2500);
}

// ===== 后台管理面板 =====
function toggleAdminPanel() {
    var p = document.getElementById('adminPanel');
    if (p.classList.contains('hidden')) { p.classList.remove('hidden'); document.body.style.overflow = 'hidden'; loadAdminConfig(); }
    else { p.classList.add('hidden'); document.body.style.overflow = ''; }
}

function loadAdminConfig() {
    var type = document.getElementById('adminConstitution').value;
    var cfg = getConfig();
    var data = cfg[type] || DEFAULT_CFG[type] || DEFAULT_CFG['\u5e73\u548c\u4f53\u8d28'];

    var sa = document.getElementById('adminSleepAdvice');
    sa.innerHTML = '';
    (data.sleepAdvice||[]).forEach(function(item, i){
        sa.innerHTML += '<div class="flex gap-2"><input class="admin-input flex-1" value="'+escapeHtml(item)+'" data-idx="'+i+'" data-field="sleepAdvice"><button onclick="this.parentElement.remove()" class="text-rose-400 hover:text-rose-300 text-xs px-2"><i class="ri-delete-bin-line"></i></button></div>';
    });

    var tp = document.getElementById('adminTreatmentPlan');
    tp.innerHTML = '';
    (data.treatmentPlan||[]).forEach(function(item, i){
        tp.innerHTML += '<div class="flex gap-2"><input class="admin-input flex-1" value="'+escapeHtml(item)+'" data-idx="'+i+'" data-field="treatmentPlan"><button onclick="this.parentElement.remove()" class="text-rose-400 hover:text-rose-300 text-xs px-2"><i class="ri-delete-bin-line"></i></button></div>';
    });

    var ap = document.getElementById('adminProducts');
    ap.innerHTML = '';
    (data.products||[]).forEach(function(p, i){
        ap.innerHTML += '<div class="flex gap-2 items-start bg-white/5 rounded-xl p-3"><div class="flex-1 space-y-2"><input class="admin-input" value="'+escapeHtml(p.name)+'" placeholder="产品名称" data-idx="'+i+'" data-pfield="name"><input class="admin-input" value="'+escapeHtml(p.desc)+'" placeholder="描述" data-idx="'+i+'" data-pfield="desc"></div><button onclick="this.parentElement.remove()" class="text-rose-400 hover:text-rose-300 text-xs px-2"><i class="ri-delete-bin-line"></i></button></div>';
    });
}

function addAdminItem(field) {
    var container = document.getElementById(field === 'sleepAdvice' ? 'adminSleepAdvice' : 'adminTreatmentPlan');
    var idx = container.children.length;
    container.innerHTML += '<div class="flex gap-2"><input class="admin-input flex-1" value="" placeholder="新条目" data-idx="'+idx+'" data-field="'+field+'"><button onclick="this.parentElement.remove()" class="text-rose-400 hover:text-rose-300 text-xs px-2"><i class="ri-delete-bin-line"></i></button></div>';
}

function addAdminProduct() {
    var container = document.getElementById('adminProducts');
    var idx = container.children.length;
    container.innerHTML += '<div class="flex gap-2 items-start bg-white/5 rounded-xl p-3"><div class="flex-1 space-y-2"><input class="admin-input" value="" placeholder="产品名称" data-idx="'+idx+'" data-pfield="name"><input class="admin-input" value="" placeholder="描述" data-idx="'+idx+'" data-pfield="desc"></div><button onclick="this.parentElement.remove()" class="text-rose-400 hover:text-rose-300 text-xs px-2"><i class="ri-delete-bin-line"></i></button></div>';
}

function saveAdminConfig() {
    var type = document.getElementById('adminConstitution').value;
    var cfg = getConfig();

    var sleepAdvice = [];
    document.querySelectorAll('#adminSleepAdvice input').forEach(function(inp){ if(inp.value.trim()) sleepAdvice.push(inp.value.trim()); });

    var treatmentPlan = [];
    document.querySelectorAll('#adminTreatmentPlan input').forEach(function(inp){ if(inp.value.trim()) treatmentPlan.push(inp.value.trim()); });

    var products = [];
    var productDivs = document.querySelectorAll('#adminProducts > div');
    productDivs.forEach(function(div){
        var inputs = div.querySelectorAll('input');
        if (inputs[0] && inputs[0].value.trim()) {
            products.push({ name: inputs[0].value.trim(), desc: inputs[1] ? inputs[1].value.trim() : '', img: 'ri-medicine-bottle-line' });
        }
    });

    cfg[type] = { sleepAdvice: sleepAdvice, treatmentPlan: treatmentPlan, products: products };
    saveConfig(cfg);
    showToast('配置已保存', 'success');
}

function resetAdminConfig() {
    var type = document.getElementById('adminConstitution').value;
    var cfg = getConfig();
    cfg[type] = JSON.parse(JSON.stringify(DEFAULT_CFG[type] || DEFAULT_CFG['\u5e73\u548c\u4f53\u8d28']));
    saveConfig(cfg);
    loadAdminConfig();
    showToast('已恢复默认配置', 'info');
}

initializeAvatarCards();

(function openPreviewResultFromQuery() {
    var params = new URLSearchParams(location.search);
    if (params.get('previewResult') !== '1') return;
    diagnosisData.avatar = { ageGroup: 'young', gender: 'male', ...avatarData.young.male };
    diagnosisData.height = '175';
    diagnosisData.weight = '65';
    diagnosisData.insomniaDuration = '1-3m';
    diagnosisData.sleepMeds = ['none'];
    diagnosisData.questionnaire = {
        sleep: 'poor',
        energy: 'low',
        diet: 'regular',
        exercise: 'weekly'
    };
    displayResults(analyzeConstitution(diagnosisData));
    openResultModal();
})();

