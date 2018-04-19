const response1 = {
    "question": {
        "type": "single",
        "text": "Has your headache started suddenly?",
        "items": [{
            "id": "s_1542",
            "name": "Headache, sudden",
            "choices": [{
                    "id": "present",
                    "label": "Yes"
                },
                {
                    "id": "absent",
                    "label": "No"
                },
                {
                    "id": "unknown",
                    "label": "Don't know"
                }
            ]
        }],
        "extras": {}
    },
    "conditions": [{
            "id": "c_39",
            "name": "Cluster headaches (CH)",
            "common_name": "Cluster headaches (CH)",
            "probability": 0.2762
        },
        {
            "id": "c_49",
            "name": "Migraine",
            "common_name": "Migraine",
            "probability": 0.1639
        }
    ],
    "extras": {},
    "should_stop": false
};

const response2 = {
    "question": {
        "type": "group_single",
        "text": "What is your body temperature?",
        "items": [{
                "id": "s_99",
                "name": "Between 99.5 and 101 °F (37 and 38 °C)",
                "choices": [{
                        "id": "present",
                        "label": "Yes"
                    },
                    {
                        "id": "absent",
                        "label": "No"
                    },
                    {
                        "id": "unknown",
                        "label": "Don't know"
                    }
                ]
            },
            {
                "id": "s_100",
                "name": "Above 101 °F (38 °C)",
                "choices": [{
                        "id": "present",
                        "label": "Yes"
                    },
                    {
                        "id": "absent",
                        "label": "No"
                    },
                    {
                        "id": "unknown",
                        "label": "Don't know"
                    }
                ]
            }
        ],
        "extras": {}
    },
    "conditions": [{
            "id": "c_39",
            "name": "Cluster headaches (CH)",
            "common_name": "Cluster headaches (CH)",
            "probability": 0.2762
        },
        {
            "id": "c_49",
            "name": "Migraine",
            "common_name": "Migraine",
            "probability": 0.1639
        }
    ],
    "extras": {},
    "should_stop": false
};

const response3 = {
    "question": {
        "type": "group_multiple",
        "text": "How would you describe your headache?",
        "items": [{
                "id": "s_25",
                "name": "Pulsing or throbbing",
                "choices": [{
                        "id": "present",
                        "label": "Yes"
                    },
                    {
                        "id": "absent",
                        "label": "No"
                    },
                    {
                        "id": "unknown",
                        "label": "Don't know"
                    }
                ]
            },
            {
                "id": "s_604",
                "name": "Feels like \"stabbing\" or \"drilling\"",
                "choices": [{
                        "id": "present",
                        "label": "Yes"
                    },
                    {
                        "id": "absent",
                        "label": "No"
                    },
                    {
                        "id": "unknown",
                        "label": "Don't know"
                    }
                ]
            },
            {
                "id": "s_23",
                "name": "Feels like pressure around my head",
                "choices": [{
                        "id": "present",
                        "label": "Yes"
                    },
                    {
                        "id": "absent",
                        "label": "No"
                    },
                    {
                        "id": "unknown",
                        "label": "Don't know"
                    }
                ]
            }
        ],
        "extras": {}
    },
    "conditions": [{
            "id": "c_39",
            "name": "Cluster headaches (CH)",
            "common_name": "Cluster headaches (CH)",
            "probability": 0.2762
        },
        {
            "id": "c_49",
            "name": "Migraine",
            "common_name": "Migraine",
            "probability": 0.1639
        }
    ],
    "extras": {},
    "should_stop": false
};

const response4 = {
    "question": {
        "type": "group_multiple",
        "text": "How would you describe your headache?",
        "items": [{
                "id": "s_25",
                "name": "Pulsing or throbbing",
                "choices": [{
                        "id": "present",
                        "label": "Yes"
                    },
                    {
                        "id": "absent",
                        "label": "No"
                    },
                    {
                        "id": "unknown",
                        "label": "Don't know"
                    }
                ]
            },
            {
                "id": "s_604",
                "name": "Feels like \"stabbing\" or \"drilling\"",
                "choices": [{
                        "id": "present",
                        "label": "Yes"
                    },
                    {
                        "id": "absent",
                        "label": "No"
                    },
                    {
                        "id": "unknown",
                        "label": "Don't know"
                    }
                ]
            },
            {
                "id": "s_23",
                "name": "Feels like pressure around my head",
                "choices": [{
                        "id": "present",
                        "label": "Yes"
                    },
                    {
                        "id": "absent",
                        "label": "No"
                    },
                    {
                        "id": "unknown",
                        "label": "Don't know"
                    }
                ]
            }
        ],
        "extras": {}
    },
    "conditions": [{
            "id": "c_39",
            "name": "Cluster headaches (CH)",
            "common_name": "Cluster headaches (CH)",
            "probability": 0.2762
        },
        {
            "id": "c_49",
            "name": "Migraine",
            "common_name": "Migraine",
            "probability": 0.1639
        }
    ],
    "extras": {},
    "should_stop": true
};