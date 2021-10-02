package dev.knapp.logging;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class LogPlayground {

    private static final Logger logger = LogManager.getLogger(LogPlayground.class);

    /*public static void main(String[] args) {

        logger.info("Program Started");
        logger.debug("This is a DEBUG level log");

        int num;
        logger.warn("The variable 'num' is never used.");

        try {

            int x = 1/0;

        } catch (ArithmeticException e) {
            logger.error("Message: " + e.getMessage());
        }

        logSomething();

    }*/

    public static void logSomething() {
        logger.info("Something was logged");
    }
}
