import scala.util._
import scala.sys.process._

import sbt._

object Util {
  def styled(in: Any): String =
    scala.Console.CYAN + in + scala.Console.RESET

  private def projectPrompt(projectName: String): String =
    s"sbt:${styled(projectName)}"

  def projectName(state: State): String =
    Project
      .extract(state)
      .currentRef
      .project

  private def run(command: String): Option[String] =
    Try(
      command
        .split(" ")
        .toSeq
        .!!(noopProcessLogger)
        .trim
    ).toOption

  private val noopProcessLogger: ProcessLogger =
    ProcessLogger(_ => (), _ => ())

  val Cctt: String =
    "compile->compile;test->test"
}
