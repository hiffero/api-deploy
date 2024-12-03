const predictSalary = async (req, res) => {
    const { age, workExperience, educationLevel, jobTitle } = req.body;

    // Validasi input
    if (!age || !workExperience || !educationLevel || !jobTitle) {
        return res.status(400).json({ error: "Missing or invalid input data" });
    }

    // Logika prediksi sederhana
    let baseSalary = 5000000; // Gaji dasar
    const experienceFactor = workExperience * 1000000; // Faktor pengalaman
    const ageFactor = age > 25 ? (age - 25) * 50000 : 0; // Faktor usia
    const educationFactor = {
        bachelor: 3000000,
        master: 5000000,
        doctorate: 7000000,
    }[educationLevel.toLowerCase()] || 0; // Faktor pendidikan

    // Penyesuaian berdasarkan job title
    const jobFactor = {
        "software engineer": 4000000,
        "data scientist": 5000000,
        "product manager": 6000000,
    }[jobTitle.toLowerCase()] || 2000000;

    // Hitung gaji prediksi
    const predictedSalary = baseSalary + experienceFactor + ageFactor + educationFactor + jobFactor;

    // Kirim respons
    res.status(200).json({
        age,
        workExperience,
        educationLevel,
        jobTitle,
        predictedSalary,
    });
};

module.exports = { predictSalary };
