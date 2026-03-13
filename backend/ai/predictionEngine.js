const calculateRiskScore = (academic, behavior, wellness) => {
    let score = 0;

    // Academic weights
    if (academic) {
        if (academic.attendancePercentage < 60) score += 20;
        else if (academic.attendancePercentage < 75) score += 10;
        
        if (academic.gpa < 5) score += 20;
        else if (academic.gpa < 7) score += 10;
        
        if (academic.courseBacklogCount > 2) score += 15;
    }

    // Behavior weights
    if (behavior) {
        if (behavior.campusEventParticipation === 0) score += 10;
        if (behavior.socialActivityParticipation === 0) score += 10;
    }

    // Wellness weights
    if (wellness) {
        if (wellness.stressLevel > 7) score += 25;
        if (wellness.mood === 'Sad' || wellness.mood === 'Burnout') score += 20;
        if (wellness.mood === 'Critical') score += 40;
        if (wellness.sleepHours < 5) score += 15;
    }

    // Cap at 100
    score = Math.min(100, score);

    let riskLevel = 'Low Risk';
    if (score >= 81) riskLevel = 'Critical Risk';
    else if (score >= 61) riskLevel = 'High Risk';
    else if (score >= 31) riskLevel = 'Medium Risk';

    // Simple probabilities for dashboard
    const dropoutProbability = Math.min(score / 100 + 0.1, 1);
    const burnoutRisk = Math.min(score / 100 + 0.2, 1);
    const suicideRisk = Math.min(score > 80 ? 0.8 : score / 200, 1);
    const mentalStressLevel = Math.min((score / 10) + 1, 10);

    return {
        score,
        riskLevel,
        dropoutProbability,
        burnoutRisk,
        suicideRisk,
        mentalStressLevel,
    };
};

module.exports = { calculateRiskScore };
