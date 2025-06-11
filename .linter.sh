#!/bin/bash
cd /home/kavia/workspace/code-generation/kollywood-quizmaster-38524-6a984d48/kollywood_quizmaster_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

