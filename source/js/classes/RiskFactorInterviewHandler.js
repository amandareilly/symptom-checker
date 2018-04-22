'use strict';

class RiskFactorInterviewHandler {
    constructor(patient, renderer, name = "Wherefore art thou?") {
        this.name = name;
        this.patient = patient;
        this.renderer = renderer;
        this.interviews = [{
                name: 'basicInterview',
                available: true,
                completed: false,
                questions: [{
                        question: 'I have recently taken or used drugs (legal or illegal), medications, tobacco, or alcohol.',
                        isRiskFactor: false,
                        riskFactorData: {
                            id: 'NRF_DRUGS'
                        },
                        dependent: 'drugsInterview'
                    },
                    {
                        question: 'I have a medical condition (such as diabetes, high blood pressure, prior surgeries or heart attack).',
                        isRiskFactor: false,
                        riskFactorData: {
                            id: 'NRF_MED_COND'
                        },
                        dependent: 'conditionsInterview'
                    },
                    {
                        question: 'I have recently suffered a physical injury.',
                        isRiskFactor: true,
                        riskFactorData: {
                            id: 'p_147',
                            common_name: 'Physical injury',
                            if_true: 'present',
                            if_false: 'absent'
                        },
                        dependent: 'injuryInterview'
                    },
                    {
                        question: 'I live, or have recently traveled outside the U.S. and/or Canada.',
                        isRiskFactor: false,
                        riskFactorData: {
                            id: 'p_13',
                            common_name: 'North America (except Mexico)',
                            if_true: null,
                            if_false: 'present'
                        },
                        dependent: 'locationInterview'
                    }
                ]
            },
            {
                name: 'femaleInterview',
                prettyName: 'Female Risk Factors',
                available: true,
                completed: false,
                description: 'Risk factors that only apply to women.',
                questions: [{
                        question: 'I am post-menopausal.',
                        isRiskFactor: true,
                        riskFactorData: {
                            id: 'p_11',
                            common_name: 'Postmenopause',
                            if_true: 'present',
                            if_false: 'absent'
                        }

                    },
                    {
                        question: 'I have given birth in the last six weeks.',
                        isRiskFactor: true,
                        riskFactorData: {
                            id: 'p_55',
                            common_name: 'Recent Childbirth',
                            if_true: 'present',
                            if_false: 'absent'
                        }
                    },
                    {
                        question: 'I have never had a menstrual period.',
                        isRiskFactor: true,
                        riskFactorData: {
                            id: 'p_141',
                            common_name: 'Pre-menstrual age',
                            if_true: 'present',
                            if_false: 'absent'
                        }
                    },
                    {
                        question: 'I am pregnant.',
                        isRiskFactor: true,
                        riskFactorData: {
                            id: 'p_42',
                            common_name: 'Pregnancy',
                            if_true: 'present',
                            if_false: 'absent'
                        }
                    }
                ]
            },
            {
                name: 'injuryInterview',
                prettyName: 'Injury Risk Factors',
                available: true,
                completed: false,
                description: 'Risk factors relating to recent injuries.',
                questions: [{
                        question: 'I have recently experienced a traumatic injury to my chest.',
                        isRiskFactor: true,
                        riskFactorData: {
                            id: 'p_136',
                            common_name: 'Skeletal Trauma, Chest',
                            if_true: 'present',
                            if_false: 'absent'
                        }
                    },
                    {
                        question: 'I have recently experienced a traumatic injury to my arm or leg.',
                        isRiskFactor: true,
                        riskFactorData: {
                            id: 'p_53',
                            common_name: 'Skeletal Trauma, Limb',
                            if_true: 'present',
                            if_false: 'absent'
                        }
                    },
                    {
                        question: 'I have recently experienced a traumatic injury to my stomach/abdomen.',
                        isRiskFactor: true,
                        riskFactorData: {
                            id: 'p_144',
                            common_name: 'Abdominal Trauma',
                            if_true: 'present',
                            if_false: 'absent'
                        }
                    },
                    {
                        question: 'I have recently experienced an injury to my back.',
                        isRiskFactor: true,
                        riskFactorData: {
                            id: 'p_146',
                            common_name: 'Back Injury',
                            if_true: 'present',
                            if_false: 'absent'
                        }
                    },
                    {
                        question: 'I have recently experienced a traumatic injury to my head.',
                        isRiskFactor: true,
                        riskFactorData: {
                            id: 'p_136',
                            common_name: 'Head Injury',
                            if_true: 'present',
                            if_false: 'absent'
                        }
                    }
                ]
            },
            {
                name: 'drugsInterview',
                prettyName: 'Drugs and Medication Risk Factors',
                available: true,
                completed: false,
                description: 'Risk factors related to alcohol, smoking, drugs, and medications.',
                questions: [{
                        question: 'I regularly take, or have recently taken, acetaminophen (e.g. Tylenol).',
                        isRiskFactor: true,
                        riskFactorData: {
                            id: 'p_25',
                            common_name: 'Recent acetaminophen intake',
                            if_true: 'present',
                            if_false: 'absent'
                        }
                    },
                    {
                        question: 'I regularly take, or have recently taken, NSAIDS (e.g. Advil, Aleve) or corticosteroids (e.g. cortisone, prednisone).',
                        isRiskFactor: true,
                        riskFactorData: {
                            id: 'p_44',
                            common_name: 'NSAID or corticosteroid use',
                            if_true: 'present',
                            if_false: 'absent'
                        }
                    },
                    {
                        question: 'I use or take opioid medications such as oxycodone (either legally or illegally).',
                        isRiskFactor: true,
                        riskFactorData: {
                            id: 'p_43',
                            common_name: 'Opioid use',
                            if_true: 'present',
                            if_false: 'absent'
                        }
                    },
                    {
                        question: 'I have recently taken or regularly take Aspirin or another salicylate medication.',
                        isRiskFactor: true,
                        riskFactorData: {
                            id: 'p_26',
                            common_name: 'Salicylate intake',
                            if_true: 'present',
                            if_false: 'absent'
                        }
                    },
                    {
                        question: 'I take sleeping pills or sedatives.',
                        isRiskFactor: true,
                        riskFactorData: {
                            id: 'p_45',
                            common_name: 'Taking sleeping pills or sedatives',
                            if_true: 'present',
                            if_false: 'absent'
                        }
                    },
                    {
                        question: 'I have recently smoked or used cannabis (marijuana) products.',
                        isRiskFactor: true,
                        riskFactorData: {
                            id: 'p_69',
                            common_name: 'Cannabis, marijuana smoking',
                            if_true: 'present',
                            if_false: 'absent'
                        }
                    },
                    {
                        question: 'I frequently consume alcohol.',
                        isRiskFactor: true,
                        riskFactorData: {
                            id: 'p_38',
                            common_name: 'Frequent alcohol consumption',
                            if_true: 'present',
                            if_false: 'absent'
                        }
                    },
                    {
                        question: 'I smoke tobacco.',
                        isRiskFactor: true,
                        riskFactorData: {
                            id: 'p_28',
                            common_name: 'Smoking',
                            if_true: 'present',
                            if_false: 'absent'
                        }
                    }
                ]
            },
            {
                name: 'conditionsInterview',
                prettyName: 'Medical Condition Risk Factors',
                available: true,
                completed: false,
                description: 'Risk factors related to your medical conditions.',
                questions: [{
                        question: 'I have diabetes.',
                        isRiskFactor: true,
                        riskFactorData: {
                            id: 'p_8',
                            common_name: 'Diabetes',
                            if_true: 'present',
                            if_false: 'absent'
                        }
                    },
                    {
                        question: 'I have high cholesterol.',
                        isRiskFactor: true,
                        riskFactorData: {
                            id: 'p_10',
                            common_name: 'High Cholesterol',
                            if_true: 'present',
                            if_false: 'absent'
                        }
                    },
                    {
                        question: 'I have high blood pressure.',
                        isRiskFactor: true,
                        riskFactorData: {
                            id: 'p_9',
                            common_name: 'High Blood Pressure',
                            if_true: 'present',
                            if_false: 'absent'
                        }
                    },
                    {
                        question: 'I have had a heart attack in the past.',
                        isRiskFactor: true,
                        riskFactorData: {
                            id: 'p_80',
                            common_name: 'Prior Heart Attack',
                            if_true: 'present',
                            if_false: 'absent'
                        }
                    },
                    {
                        question: 'I have recently had surgery.',
                        isRiskFactor: true,
                        riskFactorData: {
                            id: 'p_47',
                            common_name: 'Recent Surgery',
                            if_true: 'present',
                            if_false: 'absent'
                        }
                    }
                ]
            },
            {
                name: 'locationInterview',
                prettyName: 'Location-Related Risk Factors',
                available: true,
                completed: false,
                description: 'Risk factors related to places you\'ve lived or traveled.',
                prompt: 'Select any place where you live or where you have recently traveled.',
                questions: [{
                        isRiskFactor: true,
                        riskFactorData: {
                            id: 'p_19',
                            common_name: 'Australia and Oceania',
                            if_true: 'present',
                            if_false: 'absent'
                        }
                    },
                    {
                        isRiskFactor: true,
                        riskFactorData: {
                            id: 'p_17',
                            common_name: 'Central Africa',
                            if_true: 'present',
                            if_false: 'absent'
                        }
                    },
                    {
                        isRiskFactor: true,
                        riskFactorData: {
                            id: 'p_15',
                            common_name: 'Europe',
                            if_true: 'present',
                            if_false: 'absent'
                        }
                    },
                    {
                        isRiskFactor: true,
                        riskFactorData: {
                            id: 'p_14',
                            common_name: 'Latin and South America (including Mexico)',
                            if_true: 'present',
                            if_false: 'absent'
                        }
                    },
                    {
                        isRiskFactor: true,
                        riskFactorData: {
                            id: 'p_21',
                            common_name: 'Middle East',
                            if_true: 'present',
                            if_false: 'absent'
                        }
                    },
                    {
                        isRiskFactor: true,
                        riskFactorData: {
                            id: 'p_13',
                            common_name: 'United States and Canada',
                            if_true: 'present',
                            if_false: 'absent'
                        }
                    },
                    {
                        isRiskFactor: true,
                        riskFactorData: {
                            id: 'p_16',
                            common_name: 'Northern Africa',
                            if_true: 'present',
                            if_false: 'absent'
                        }
                    },
                    {
                        isRiskFactor: true,
                        riskFactorData: {
                            id: 'p_20',
                            common_name: 'Russia, Kazakhstan and Mongolia',
                            if_true: 'present',
                            if_false: 'absent'
                        }
                    },
                    {
                        isRiskFactor: true,
                        riskFactorData: {
                            id: 'p_18',
                            common_name: 'Southern Africa',
                            if_true: 'present',
                            if_false: 'absent'
                        }
                    },
                    {
                        isRiskFactor: true,
                        riskFactorData: {
                            id: 'p_22',
                            common_name: 'Southwestern Asia',
                            if_true: 'present',
                            if_false: 'absent'
                        }
                    }
                ]
            }
        ];
    }

    run() {
        const interview = this.findNextAvailableInterview();
        console.log(interview);
        if (interview) {
            this.renderer.run('main', 'riskFactorInterviews_interview-form', interview);
        } else {
            this.patient.handler.riskFactorInterviewComplete();
        }
    }

    findNextAvailableInterview() {
        console.log(this);
        const interview = this.interviews.find(interview => interview.available && !interview.completed);
        console.log(interview);
        return interview;
    }

    findInterviewByName(name) {
        return this.interviews.find(interview => interview.name === name);
    }

    findQuestionById(interviewName, id) {
        const interview = this.findInterviewByName(interviewName);
        const question = interview.questions.find(question => question.riskFactorData.id === id);
        console.log(question);
        return question;
    }

    markInterviewCompleted(name) {
        const interview = this.findInterviewByName(name);
        interview.completed = true;
    }

    markInterviewUnavailable(name) {
        console.log('mark interview unavailable running');
        console.log(this);
        console.log(name);
        const interview = this.findInterviewByName(name);
        interview.available = false;
        console.log(this);
    }

    processInterviewAnswers() {
        const interviewName = $('form').data('interview-name');
        const self = this;

        $('input').each(function() {
            const id = this.id;
            const checked = $(this).prop('checked');
            if (id !== 'none') {
                const question = self.findQuestionById(interviewName, id);
                if (question.isRiskFactor) {
                    const presence = checked ? question.riskFactorData.if_true : question.riskFactorData.if_false;
                    if (presence) {
                        self.patient.addEvidence(id, presence, true, question.riskFactorData.common_name);
                    }
                }
                if (question.hasOwnProperty('dependent') && !checked) {
                    self.markInterviewUnavailable(question.dependent);
                }
            }
        });
        this.markInterviewCompleted(interviewName);
        this.run();
    }
}