import axios from "axios"


export const getJudge0LanguageId = (language)=>{
    const languageMap = {
        "PYTHON":71,
        "JAVA":62,
        "JAVASCRIPT":63,
        "C++":54,
    }

    return languageMap[language.toUpperCase()]
}

const sleep  = (ms)=> new Promise((resolve)=> setTimeout(resolve , ms))

// Helper function to encode strings to base64
const encodeBase64 = (str) => {
    return Buffer.from(str).toString('base64')
}

// Helper function to decode base64 to string
const decodeBase64 = (str) => {
    return Buffer.from(str, 'base64').toString('utf-8')
}

export const pollBatchResults = async (tokens)=>{
    while(true){
        
        const {data} = await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`,{
            params:{
                tokens:tokens.join(","),
                base64_encoded:true,
            }
        })

        const results = data.submissions.map(submission => ({
            ...submission,
            stdout: submission.stdout ? decodeBase64(submission.stdout) : null,
            stderr: submission.stderr ? decodeBase64(submission.stderr) : null,
            compile_output: submission.compile_output ? decodeBase64(submission.compile_output) : null,
        }))

        const isAllDone = results.every(
            (r)=> r.status.id !== 1 && r.status.id !== 2
        )

        if(isAllDone) return results
        await sleep(1000)
    }
}

export const submitBatch = async (submissions)=>{
    // Encode the submissions
    const encodedSubmissions = submissions.map(submission => ({
        ...submission,
        source_code: encodeBase64(submission.source_code),
        stdin: submission.stdin ? encodeBase64(submission.stdin) : null,
    }))

    const {data} = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=true`,{
        submissions: encodedSubmissions
    })


    console.log("Submission Results: ", data)

    return data // [{token} , {token} , {token}]
}


export function getLanguageName(languageId){
    const LANGUAGE_NAMES = {
        63: "JavaScript",
        54: "C++",
        71: "Python",
        62: "Java",
    }

    return LANGUAGE_NAMES[languageId] || "Unknown"
}